Feature: Single day’s schedule

Scenario: Each episode has an original version
  When I make a request to "/api/RMSTest/ibltest"
  Then each "schedule elements episode versions" has an "original" "kind"

Scenario: Lexical sort order is valid
  When I make a request to  "/api/RMSTest/ibltest"
  Then each episodes lexical sort order is valid

  Scenario: 
  When I make a request to  "/api/RMSTest/ibltest"
    And  an episode staus is "available"
  Then I am able to access that episode
