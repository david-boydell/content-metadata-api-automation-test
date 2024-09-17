import { defineParameterType } from '@cucumber/cucumber'

defineParameterType({
  regexp: /"([^"]*)"/,
  transformer: (s) => s.replaceAll(' ', '.'),
  name: 'dotPath',
})
