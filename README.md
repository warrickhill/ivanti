# Ivanti Tech Assessment

## Requirement Details:

- When clients visit the website, they should be able to see a list of dishes with details including name, description, image, price and average rating score by registered clients.
- There is no register page or access point on this website because clients can only register their accounts in person at the restaurant.
- Clients need to provide a username, password, email and contact number to register an account.
- Then the admin can register the account through an internal page.
- After clients register their account, they should be able to login and rate dishes on a scale of 1-5. Please note clients can only rate each dish once.
- For the admin, they should be able to add, read, update and delete dishes.
- The admin should also be able to use parameters to find specific dishes.
- It is estimated that there will be more than 2000 registered clients and 80 different types of dishes. There are also around 6 admin staff to manage the website.
- The admin staff can also create new admin accounts.
- The admin can also ban hostile registered users from rating any dishes.

## Solution details

- Frontend will be a react SPA
- Backend will be an express app, this will allow it to be deployed either as a docker container or as a lambda function.
- DB will be sqlite.

### Notes

- For development I am using bun. Why you ask? It's a drop in replacement for nodejs that has typescript support built in and as far as i can tell so far is faster than nodejs.
