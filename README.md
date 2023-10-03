# Forum Website
For this project I'm building a forum website. The backend is being built using Go and the Gin web framework, and the frontend is being built with React. The project is still ongoing and the following has been completed on the backend
* Users can register/login
* Create/read/update/delete posts
* Users can add posts to comments
* Users can filter posts by title and associated tags

On the frontend the following has been added
* Registration/login form
* User profile that displays users posts
* Homepage that displays all posts
* Expand posts to view content
* Can comment on expanded posts, can edit/delete posts if user is the author

The following needs to be added to the backend
* Refresh tokens, at the moment I'm just using access tokens that have a long lifetime which is a security risk
* Storing JWT using an HttpOnly cookie, currently I'm storing the access token using local storage on the frontend which is vulnerable to XSS attacks  

For the frontend the following needs to be added
* The ability to change pages to view past posts
* General styling changes