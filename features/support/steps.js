import { Given, When, Then } from '@cucumber/cucumber'
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

Then('the response time is below {int} milliseconds', function (responseTime) {
  assert(this.res.timings.phases.total < responseTime)
})

Then('the {string} has a value', function (string) {
  assert.ok(get(this.res.json, dotPath(this.res.json, string)))
})

Then('each {array} {path} has a value', function (array, path) {
  arr(this.res.json, array).forEach((element) => {
    assert.ok(get(this.res.json, dotPath(this.res.json, string)))
  })
})

Then('each {str} {str} has a value of {str}', function (str, str2, str3) {
  arr(this.res.json, dotPath(this.res.json, string)).forEach((element) => {
    assert.strictEqual(get(element, dotPath(this.res.json, string2)), string3)
  })
})

// Background:
//   When I make a request to "/api/RMSTest/ibltest"

// Scenario: 1. A valid HTTP response is received
//   Then the response code is "200"
//     And the response time is below 1000 milliseconds

// Scenario: 2. Id and type are populated
//   Then the "channel id" has a value
//     And each "elements episode type" has a value of "episode"

// Scenario: 3. Episode titles are populated
//   Then each "elements episode title" has a value

// Scenario: 4. Only one episode has a valsue of "live"
//   Then 1 "elements episode" has a value of "live"

// Scenario: 5. Transmission start date is before transmission end date
//   Then each "elements transmission_start_date" is before the "elements transmission_end_date"

// Scenario: 6. The Date value is the current time
//   Then the Date header value is the current time

const dotPath = function (json, string) {
  return string.replaceAll(' ', '.').replace(/^/, feedType(json))
}

const arr = function (json, string) {
  const path = dotPath(json, string)
  return get(json, path.substring(0, path.lastIndexOf('.')))
}

const feedType = function (json) {
  return `${Object.keys(json)[0]}.`
}
