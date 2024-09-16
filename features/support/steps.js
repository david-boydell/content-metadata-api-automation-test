import { When, Then } from '@cucumber/cucumber'
import { dotPath, iterate } from './helpers.js'
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
Then('the response code is {string}', async function (string) {
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
Then('the {string} {string} property exists', function (string, string1) {
  assert(string1 in get(this.res.json, dotPath(string)))
})

// This function asserts that a given property has a value. assert.ok() tests if
// value is truthy.
Then('the {string} has a value', function (string) {
  assert.ok(get(this.res.json, dotPath(string)))
})

// This function iterates over an array, returned from the response body (the
// iterate function is imported from helpers.js). It asserts that a given
// property is truthy for each element in the array.
Then('each {string} {string} has a value', function (string, string1) {
  iterate(this.res.json, string).forEach((element) => {
    assert.ok(get(element, dotPath(string1)))
  })
})

// This function asserts that a given property has a specific value for each
// element in the array.
Then(
  'each {string} {string} has a value of {string}',
  function (string, string2, string3) {
    iterate(this.res.json, string).forEach((element) => {
      assert.strictEqual(get(element, dotPath(string2)), string3)
    })
  },
)

// This function asserts that only x elements in an array have a particular
// value
Then(
  '{int} {string} {string} has a value of {string}',
  function (int, string, string2, string3) {
    let count = 0
    iterate(this.res.json, string).forEach((element) => {
      if (get(element, dotPath(string2)).toString() == string3) {
        count = ++count
      }
    })
    assert.strictEqual(count, int)
  },
)

// This function iterates over an array, asserting that a one date is earlier
// than another.
Then(
  'each {string} {string} is before {string}',
  function (string, string1, string2) {
    iterate(this.res.json, string).forEach((element) => {
      const before = Date.parse(get(element, dotPath(string1)))
      const after = Date.parse(get(element, dotPath(string2)))
      assert(before < after)
    })
  },
)

// This function parses the response Date field, and then asserts that that its
// value is now, or thereabouts. The this.parameters.responseUpperLimit is set
// in cucumber.js, I cannot  rely on the value set in Scenario 1 having been run
Then('the Date header value is the current time', function () {
  assert(
    this.res.timings.end - Date.parse(this.res.headers.date) <=
      this.parameters.responseUpperLimit,
  )
})
