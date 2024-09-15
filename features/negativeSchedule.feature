Feature: Single day’s schedule

Scenario: 1. A valid HTTP response is received
  When I make a request to "/api/RMSTest/ibltest/2023-09-11"
  Then the response code is "404"
      And the "error" "details" property exists
      And the "error" "http_response_code" property exists