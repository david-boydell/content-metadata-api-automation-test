import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'node:assert/strict'
import path from 'path'
import got from 'got'

When('I make a request to {url}', async function (url) {
  this.response = got.get(path.join(this.baseUrl, url))
})

Then('the response code is {code}', async function (code) {
  assert.strictEqual(this.response, code)
})
