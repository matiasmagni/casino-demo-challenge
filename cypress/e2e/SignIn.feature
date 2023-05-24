Feature: Sign In
  As a User, I want to be able to sign in into Casino web application using e-mail, phone number or social networks.

  @PositiveTest @PipelineIgnore @HybridTest
  Scenario Outline: User signs in correctly using email
    Given the user has navigated to "Sign In" page
    And the user has closed the Welcome window
    When the user inputs valid data into "Sign In" form
      | Field    | Type  | Value      |
      | Username | Input | <username> |
      | Password | Input | <password> |
    Then the user cannot visualize the obfuscated password
    When the user clicks on password eye button
    Then the user can visualize the non obfuscated password
    When the user clicks on "SIGN IN" form button
    And the user completes the captcha manually
    Then the user is redirected to "Dashboard" page
    And the user visualizes the user info header correctly

    Examples:
      | username               | password    | passwordConfirmation |
      | matias.magni@gmail.com | Password123 | Password123          |
