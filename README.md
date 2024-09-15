# content-metadata-api-automation-test
## Requirements
Node v18.20.4
## Installation
Clone the repo then use the following steps:
1. `cd content-metadata-api-automation-test`
2. `npm install`
3. `nvm use` (if v20.17.0 is not installed please use `nvm install`)
4. `npx cucumber-js`

Once the tests have finished running:

5. `open cucumber-report.html`

## General structure
`cucumber.js` The config file for cucumber, this allows for the default https://testapi.io to be overriden on the command line. It also specifies the report type.

`features/todaySchedule.feature` contains Scenarios 1-6 from the _Content Metadata API Automation Test_ document.

`features/negativeSchedule.feature` contains Scenario 7.

`features/support/steps.js` contains the cucumber steps.

`features/support/helpers.js` contains a couple of helper functions that I have used in step.js.

## Caveats
1. I have not used `Given` in my feature files or step definition files, this is intentional.
2. I have included eslint and prettier. If this interferes with your set up please uninstall.
