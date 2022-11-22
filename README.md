Tests: 
[![.github/workflows/verify.yml](https://github.com/Simpada/pg6301-exam/actions/workflows/verify.yml/badge.svg)](https://github.com/Simpada/pg6301-exam/actions/workflows/verify.yml)

Client Coverage: 
[![](client/coverage/badge.svg)](https://github.com/Simpada/pg6301-exam/commit/94d65c6078e87499d64602c9376fef08b557b53b#commitcomment-90734665)

Server Coverage: 
[![](server/coverage/badge.svg)](https://github.com/Simpada/pg6301-exam/commit/94d65c6078e87499d64602c9376fef08b557b53b#commitcomment-90734701)

# pg6301-exam

#### Personal Repo for project: https://github.com/Simpada/pg6301-exam
Used a personal repo because of some problems with GitHub-classrooms and secrets

#### To start the programme, "npm run dev" while in the root folder

#### Endpoints
- /api/menu to get menu
- /api/menu/add to add items to the menu with post
- /api/login to login and check login status wwith get/post, and to delete cookies

#### Users
Admin: <br />
username: admin <br />
password: admin

Guest: <br />
username: guest <br />
password: guest
 
### Features: 
- The programme consists of a single "page", using React-Router to move between a total of 4 different pages
  - / which has the main menu where you can select where to go
  - /menu to see menu items
  - /menu/add to add new items, this is only accessible if logged in as admin
  - /login to login
- There is a top bar with Front Page, Menu, Login/logout, that is always visible and can be used to navigate from anywhere. This bar also shows the name of the logged in account
- The programme uses a restful API with GET, POST, and DELETE calls, and the client sends JSON with data to the server and uses fetch
- The project has been uploaded to a repository, and have been continuously updated there, with using branches and GitHub actions for testing
- Cookies are used to keep the logged in state of a user, and the cookies are cleared when a user logs out. The cookies also determine certain access dependent on who is logged in
- The front end has a login page
- A logged-in user can see their name at the top
- A user can log in or log out from any page
- The add new item can handle a string of seperated words, transforming it into an array for the database
- The programme uses a real time database to store the items in the menu
- A guest can see the entire menu, and sort the dishes by category or by price
- An admin can add new items, guests cannot access this part
