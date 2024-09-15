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
  function (string, string1, string2) {
    iterate(this.res.json, string).forEach((element) => {
      const before = Date.parse(get(element, dotPath(string1)))
      const after = Date.parse(get(element, dotPath(string2)))
      assert(before < after)
    })
  },
)

Then('the Date header value is the current time', function () {
  var t = new Date()
  assert(Date.parse(this.res.headers.date) <= t.setSeconds(t.getSeconds() + 1))
})

const dotPath = (string) => {
  return string.replaceAll(' ', '.')
}

const iterate = (json, string) => {
  return get(json, dotPath(string))
}
