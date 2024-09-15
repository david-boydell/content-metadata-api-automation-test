Feature: Single day’s schedule

Background:
  When I make a request to "/api/RMSTest/ibltest"

Scenario: 1. A valid HTTP response is received
  Then the response code is "200"
    And the response time is below 1000 milliseconds
  
Scenario: 2. Id and type are populated
  Then the "schedule channel id" has a value
    And each "schedule elements" "episode type" has a value of "episode"

Scenario: 3. Episode titles are populated
  Then each "schedule elements" "episode title" has a value

Scenario: 4. Only one episode has a value of "live"
  Then 1 "schedule elements" "episode live" has a value of "true"

Scenario: 5. Transmission start date is before transmission end date
  Then each "schedule elements" "transmission_start" is before "transmission_end"

Scenario: 6. The Date value is the current time
  Then the Date header value is the current time