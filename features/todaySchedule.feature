Feature: Single day’s schedule

Background:
  When I make a request to "/api/RMSTest/ibltest"

Scenario: 1. A valid HTTP response is received
  Then the response code is "200"
    And the response time is below 1000 milliseconds
  
Scenario: 2. Id and type are populated
  Then each "id" field has a value
    And each "episode type" has a value of "episode"

Scenario: 3. Episode titles are populated
  Then each episode title has a value

Scenario: 4. Only one episode has a value of "live"
  Then only one episode is live

Scenario: 5. Transmission start date is before transmission end date
  Then each transmission start date is before the transmission end date

Scenario: 6. The Date value is the current time
  Then the Date value is the current time