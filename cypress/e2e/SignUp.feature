Feature: Sign Up
  As a User, I want to be able to sign up into Casino web application using e-mail, phone number or social networks.

  @PipelineIgnore @HybridTest
  Scenario Outline: User signs up correctly using email and selecting USD currency without a redeem bonus
    Given the user has navigated to "Sign Up" page
    And the user has closed the Welcome window
    When the user inputs valid data into "Sign Up" form
      | Field                 | Type               | Value                  |
      | Email                 | Random Email Input | <emailPrefix>          |
      | Agreement             | Checkbox           | Yes                    |
      | Password              | Input              | <password>             |
      | Password Confirmation | Input              | <passwordConfirmation> |
    And the user selects "No bonus" option on Redeem Bonus section
    And the user clicks on "Create account" form button
    And the user completes the captcha manually
    Then the user is redirected to "Registration Success" page
    And the user visualizes "Registration Success" page correctly

    Examples:
      | emailPrefix  | password    | passwordConfirmation |
      | matias.magni | Password123 | Password123          |
      | test1        | P4SSword123 | P4SSword123          |
      | abc-d        | PaSsw0rd321 | PaSsw0rd321          |
  #Assuming emails with + pattern are not valid because of security reasons
  #| abc+def      | Yes       | PaSsw0Rd321 | PaSsw0Rd321          |

  # This scenario is left commented because of missing testing data: "valid promo codes"

  #@PipelineIgnore @HybridTest
  #Scenario Outline: User signs up correctly using email and selecting USD currency with a redeem bonus
  #Given the user has navigated to "Sign Up" page
  #When the user closes the Welcome window
  #And the user inputs valid data into "Sign Up" form
  #| Element               | Type               | Value                  |
  #| Email                 | Random Email Input | <emailPrefix>          |
  #| Agreement             | Checkbox           | <agreement>            |
  #| Password              | Input              | <password>             |
  #| Password Confirmation | Input              | <passwordConfirmation> |
  #And the user selects "Use a promo code" option on Redeem Bonus section of "Sign Up" page
  #And the user inputs the promo code: "<promoCode>"
  #And the user clicks on "Create account" form button
  #And the user completes the captcha manually
  #Then the user is redirected to "Registration Success" page
  #And the user visualizes "Registration Success" page correctly

  #Examples:
  #| emailPrefix  | agreement | promoCode | password    | passwordConfirmation |
  #| matias.magni | Yes       | AXCD1234  | Password123 | Password123          |
  #| test1        | Yes       | AXCD9824  | P4SSword123 | P4SSword123          |
  #| abc-d        | Yes       | AXCD2134  | PaSsw0rd321 | PaSsw0rd321          |
  #| abc+def      | Yes       | AXCD7568  | PaSsw0Rd321 | PaSsw0Rd321          |

  @PipelineIgnore @HybridTest
  Scenario Outline: User signs up correctly using email and selecting a currency distinct from USD
    Given the user has navigated to "Sign Up" page
    And the user has closed the Welcome window
    When the user inputs valid data into "Sign Up" form
      | Field                 | Type               | Value                  |
      | Email                 | Random Email Input | <emailPrefix>          |
      | Agreement             | Checkbox           | Yes                    |
      | Currency              | Dropdown           | <currency>             |
      | Password              | Input              | <password>             |
      | Password Confirmation | Input              | <passwordConfirmation> |
    Then the user cannot visualize the Reedeem Bonus section
    And the user clicks on "Create account" form button
    And the user completes the captcha manually
    Then the user is redirected to "Registration Success" page
    And the user visualizes "Registration Success" page correctly

    Examples:
      | emailPrefix | currency | password    | passwordConfirmation |
      | test-EUR    | EUR      | Password111 | Password111          |
      | test-ILS    | ILS      | Password111 | Password111          |
      | test-mlTC   | mLTC     | Password111 | Password111          |
      | test-mDOGE  | mDOGE    | Password111 | Password111          |
      | test-USDTT  | USDTT    | Password111 | Password111          |
      | test-USDTE  | USDTE    | Password111 | Password111          |
      | test-mBCH   | mBCH     | Password111 | Password111          |
      | test-mETH   | mETH     | Password111 | Password111          |
      | test-BYR    | BYR      | Password111 | Password111          |
      | test-USDT   | USDT     | Password111 | Password111          |