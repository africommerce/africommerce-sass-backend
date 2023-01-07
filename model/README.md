## Database Schema
<!-- This document should be updated to reflect changes in the Model codebase -->
##### This document should be updated to reflect changes in the Model codebase
---

## List Of Schema

### 1. User

This Table Manages User Details

<!-- Add note here  -->

| Attribute                |                     Type                      |
| ------------------------ | :-------------------------------------------: |
| \_ID                     |            PRIMARY_KEY table(SELF)            |
| Username                 |       String - Require & Unique - True        |
| First Name               |            String - Require - True            |
| Last Name                |            String - Require - True            |
| Email                    |       String - Require & Unique - True        |
| Email is confirmed       |           Boolean - Default - False           |
| Password                 |            String - Require - True            |
| Phone Number             |            String - Require - True            |
| Address                  |                    String                     |
| User type                | String - Enum[business, user] - Default[user] |
| Admin                    |           Boolean - Default - False           |
| EmailVerificationToken   |                    String                     |
| EmailVerificationExpires |                    String                     |


### 2. Business User

This Table Manages Business Users

<!-- Add note here  -->

| Attribute      |            Type            |
| -------------- | :------------------------: |
| \_ID           |  PRIMARY_KEY table(SELF)   |
| Business Name  |  String - Require - True   |
| Address        |            List            |
| Country        |  String - Require - True   |
| City           |  String - Require - True   |
| Street Address |  String - Require - True   |
| Logo           |  String - Require - True   |
| Owner          | FOREIGN_KEY table (`User`) |



### 3. Brand

This Table Manages The
Brand

<!-- Add note here  -->

| Attribute |               Type               |
| --------- | :------------------------------: |
| \_ID      |     PRIMARY_KEY table(SELF)      |
| Name      | String - Require & Unique - True |



### 4. Category

This Table Manages The Category

| Attribute |               Type               |
| --------- | :------------------------------: |
| \_ID      |     PRIMARY_KEY table(SELF)      |
| Name      | String - Require & Unique - True |



### 5. Order

This Table Manages The Order

<!-- Add note here  -->

| Attribute     |                                    Type                                    |
| ------------- | :------------------------------------------------------------------------: |
| \_ID          |                          PRIMARY_KEY table(SELF)                           |
| User          |                         FOREIGN_KEY table (`User`)                         |
| Product Owner |                         FOREIGN_KEY table (`User`)                         |
| Product       |                       FOREIGN_KEY table (`Product`)                        |
| Status        | String - Enum[created, processing, dispatch, completed] - Default[created] |



### 6. Product

This Table Manages The Product

<!-- Add note here  -->

| Attribute       |              Type              |
| --------------- | :----------------------------: |
| \_ID            |    PRIMARY_KEY table(SELF)     |
| Name            |    String - Require - True     |
| Brand           |  FOREIGN_KEY table (`Brand`)   |
| Product Details |             String             |
| Category        | FOREIGN_KEY table (`Category`) |
| Quantity        |    Number - Require - True     |
| Amount Sold     |      Number - Default - 0      |
| Price           |    Number - Require - True     |
| Description     |    String - Require - True     |
| Warranty        |             String             |
| Refundable      |    Boolean - Default - True    |
| Owner ID        |   FOREIGN_KEY table (`User`)   |
| Rating          |      Number - Default - 0      |
| Images          |    String - Require - True     |



### 7. Review

This Table Manages The Review

<!-- Add note here  -->

| Attribute |             Type              |
| --------- | :---------------------------: |
| \_ID      |    PRIMARY_KEY table(SELF)    |
| Product   | FOREIGN_KEY table (`Product`) |
| Rating    |   Number - Required - True    |
| Comment   |   String - Require - False    |
| Owner ID  |  FOREIGN_KEY table (`User`)   |



### 8. Wish List

This Table Manages The Wish List

<!-- Add note here  -->

| Attribute |             Type              |
| --------- | :---------------------------: |
| \_ID      |    PRIMARY_KEY table(SELF)    |
| User      |  FOREIGN_KEY table (`User`)   |
| Product   | FOREIGN_KEY table (`Product`) |



<!-- @Timothy-py -->
