Feature: Login functionality
  As a Todo.ly user
  I want to log in to my account
  So that I can manage my tasks

  Scenario: Successful login with valid credentials
    Given the user opens the Todo.ly site
    When the user clicks the login button
    And the user enters a valid email and password
    And the user submits the login form
    Then the logout option should be visible