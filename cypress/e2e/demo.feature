Feature: Login

  Scenario: user login

    Given I visit kartwheel

    When I do login

    Then I should see a title

  Scenario: user login with incorrect credential

    Given I visit kartwheel

    When I do login with incorrect password

    Then I should see an alert for password

  Scenario: user login with incorrect email

    Given I visit kartwheel

    When I do login with incorrect email

    Then I should see an alert for email

  Scenario: user signin

    Given I visit kartwheel

    When I signin

    Then I should see an alert for existing email

  Scenario: Search valid string

    Given i am on shop page

    When i search for valid string

    Then i should see result
  
  Scenario: Search invalid string

    Given i am on shop page

    When i search for invalid string

    Then i should not see result
  
  Scenario: Search empty

    Given i am on shop page

    When i search for empty string

    Then i should see result
  
  Scenario: filter 

    Given i am on shop page

    When i filler product

    Then i should see result

  Scenario: filter pt2 

    Given i am on shop page

    When i filler product with no results

    Then i should not see result

  Scenario: view details

    Given i am on shop page

    When i clicked view details

    Then i should see result

  Scenario: Logout

    Given i am on shop page

    When i logout

    Then i should see login page

    Scenario: Add To Kart

    Given i am on shop page

    When i add to kart
    
    Scenario: delete from Kart

    Given i am on shop page

    When i delete from kart

Scenario: Proceed To CheckOut

Given i am on shop page

When i add to kart 

And i proceed to checkout

And i confirm order

Then i should see modal

Scenario: Proceed To CheckOut

Given i am on shop page

When i add to kart 

And i proceed to checkout

And i confirm order

And i visit my orders



Scenario: delete from CheckOut

Given i am on shop page

When i add to kart 

And i proceed to checkout

And i delete from kart

Scenario: Add form view Details page

Given i am on shop page

When i clicked view details

And i add item












  