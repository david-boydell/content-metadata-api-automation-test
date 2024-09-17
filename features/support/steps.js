import { When, Then } from '@cucumber/cucumber'
import { iterate } from './helpers.js'
import assert from 'node:assert/strict'
import path from 'path'
import got from 'got'
import get from 'lodash.get'

// This function makes a request to the API, then stores both the initial
// ressponse and the body as a JS object.
When('I make a request to {string}', async function (string) {
  this.res = await got.get(path.join(this.parameters.baseUrl, string), {
    throwHttpErrors: false,
  })
  this.res.json = JSON.parse(this.res.body)
})

// This function asserts the response code matches the code specified.
Then('the response code is {string}', function (string) {
  assert.strictEqual(this.res.statusCode.toString(), string)
})

// This function uses the timings.phases.total from the response object and
// asserts that it is less than the number of milliseconds defined in the step.
Then('the response time is below {int} milliseconds', function (int) {
  assert(this.res.timings.phases.total < int)
})

// This function asserts that a specific property exists on an object. The get
// function takes the response json and a dot path to retrieve the property (if
// it exists).
Then('the {dotPath} {string} property exists', function (dotPath, string) {
  assert(string in get(this.res.json, dotPath))
})

// This function asserts that a given property has a value. assert.ok() tests if
// value is truthy.
Then('the {dotPath} has a value', function (dotPath) {
  assert.ok(get(this.res.json, dotPath))
})

// This function iterates over an array, returned from the response body (the
// iterate function is imported from helpers.js). It asserts that a given
// property is truthy for each element in the array.
Then('each {dotPath} {dotPath} has a value', function (dotPath, dotPath1) {
  iterate(this.res.json, dotPath).forEach((element) => {
    assert.ok(get(element, dotPath1))
  })
})

// This function asserts that a given property has a specific value for each
// element in the array.
Then(
  'each {dotPath} {dotPath} has a value of {string}',
  function (dotPath, dotPath1, string) {
    iterate(this.res.json, dotPath).forEach((element) => {
      assert.strictEqual(get(element, dotPath1), string)
    })
  },
)

// This function asserts that only x elements in an array have a particular
// value
Then(
  '{int} {dotPath} {dotPath} has a value of {string}',
  function (int, dotPath, dotPath1, string) {
    let count = 0
    iterate(this.res.json, dotPath).forEach((element) => {
      if (get(element, dotPath1).toString() == string) {
        count = ++count
      }
    })
    assert.strictEqual(count, int)
  },
)

// This function iterates over an array, asserting that one date is earlier
// than another.
Then(
  'each {dotPath} {dotPath} is before {dotPath}',
  function (dotPath, dotPath1, dotPath2) {
    iterate(this.res.json, dotPath).forEach((element) => {
      const before = Date.parse(get(element, dotPath1))
      const after = Date.parse(get(element, dotPath2))
      assert(before < after)
    })
  },
)

// This function parses the response Date header, and then asserts that that its
// value is now, or thereabouts. The this.parameters.responseUpperLimit is set
// in cucumber.js, I cannot rely on the value set in Scenario 1 having been run
Then('the Date header value is the current time', function () {
  assert(
    this.res.timings.end - Date.parse(this.res.headers.date) <=
      this.parameters.responseUpperLimit,
  )
})
