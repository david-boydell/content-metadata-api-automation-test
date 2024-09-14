import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'node:assert/strict'
import path from 'path'
import got from 'got'

When('I make a request to {string}', async function (url) {
  this.response = await got.get(path.join(this.parameters.baseUrl, url))
})

Then('the response code is {string}', async function (code) {
  assert.strictEqual(this.response.statusCode.toString(), code)
})

Then('the response time is below {int} milliseconds', function (responseTime) {
  assert(this.response.timings.phases.total < responseTime)
})

Then('each {string} field has a value', function (code) {
  assert.ok(field[code])
})

// Scenario: 2. Id and type are populated
//   Then each id field has a value
//     And each episode type has a value of "episode"

// Scenario: 3. Episode titles are populated
//   Then each episode title has a value

// Scenario: 4. Only one episode has a value of "live"
//   Then only one episode is live

// Scenario: 5. Transmission start date is before transmission end date
//   Then each transmission start date is before the transmission end date

// Scenario: 6. The Date value is the current time
//   Then the Date value is the current time
console.log(this)
const field = {
  id: function () {
    return JSON.parse(this.response.body).schedule.elements
  },
  'episode type': function () {
    return this.response.body.espisode.type
  },
}
