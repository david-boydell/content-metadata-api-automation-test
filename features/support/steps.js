import { When, Then, defineParameterType } from '@cucumber/cucumber'
import assert from 'node:assert/strict'
import path from 'path'
import got from 'got'
import get from 'lodash.get'

When('I make a request to {string}', async function (url) {
  this.res = await got.get(path.join(this.parameters.baseUrl, url))
  this.res.json = JSON.parse(this.res.body)
})

Then('the response code is {string}', async function (responseCode) {
  assert.strictEqual(this.res.statusCode.toString(), responseCode)
})

Then('the response time is below {int} milliseconds', function (int) {
  assert(this.res.timings.phases.total < int)
})

Then('the {string} has a value', function (string) {
  assert.ok(get(this.res.json, dotPath(string)))
})

Then('each {string} {string} has a value', function (string, string1) {
  iterate(this.res.json, string).forEach((element) => {
    assert.ok(get(element, dotPath(string1)))
  })
})

Then(
  'each {string} {string} has a value of {string}',
  function (string, string2, string3) {
    iterate(this.res.json, string).forEach((element) => {
      assert.strictEqual(get(element, dotPath(string2)), string3)
    })
  },
)

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

Then(
  'each {string} {string} is before {string}',
  function (string, date, date) {
    iterate(this.res.json, string).forEach((element) => {
      const before = new Date(get(element, dotPath(string2)))
      const after = new Date(get(element, dotPath(string3)))
      assert(before < after)
    })
  },
)

// Feature: Single day’s schedule

// Background:
//   When I make a request to "/api/RMSTest/ibltest"

// Scenario: 1. A valid HTTP response is received
//   Then the response code is "200"
//     And the response time is below 1000 milliseconds

// Scenario: 2. Id and type are populated
//   Then the "schedule channel id" has a value
//     And each "schedule elements" "episode type" has a value of "episode"

// Scenario: 3. Episode titles are populated
//   Then each "schedule elements" "episode title" has a value

// Scenario: 4. Only one episode has a valsue of "live"
//   Then 1 "schedule elements"  "episode" has a value of "live"

// Scenario: 5. Transmission start date is before transmission end date
//   Then each "schedule elements" "transmission_start_date" is before the "schedule elements" "transmission_end_date"

// Scenario: 6. The Date value is the current time
//   Then the Date header value is the current time

const dotPath = (string) => {
  return string.replaceAll(' ', '.')
}

const iterate = (json, string) => {
  return get(json, dotPath(string))
}
