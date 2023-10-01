# Forum Website
For this project I'm building a forum website, the project is still ongoing and the following has been completed
* users can register/login
* create/read/update/delete posts
* users can add posts to comments
* users can filter posts by title and associated tags

The following needs to be added to the backend
* Refresh tokens, at the moment I'm just using access tokens that have a long lifetime which is a security risk
* Storing JWT using httpOnly cookies, currently I'm storing the access token using local storage on the frontend which is vulnerable to XSS attacks  

For the frontend the following needs to be added
* The ability to change pages to view past posts
* General styling changes