![logo](./Logo.png) 
# artistConnect-server- Back-End  

## MERN application 


Netlify URL :  

Heroku URL: https://artist-connect-app-a5e604cdf8ee.herokuapp.com/

Front-End Repo: https://github.com/ArtistConnect-Online-Art-Gallery/artistConnect

Server Repo: https://github.com/ArtistConnect-Online-Art-Gallery/artistConnect-server

Part A Documentation Repo: https://github.com/ArtistConnect-Online-Art-Gallery/Documentation

"Artist Connect" is a dynamic online art gallery platform designed to address the challenge of artists gaining visibility for their artworks and to facilitate connections among individuals with a shared passion for art. Built using the MERN stack (MongoDB, Express, React, Node.js), "Artist Connect" provides a user-friendly and visually appealing experience.

## Installation 

Ensure that the following tools and dependencies are installed if you want to use the app locally:

* Node.js 18.19.0
* MongoDB


## Server Libraries
### Back End

* `bcrypt` is used for hashing our user's passwords, this library is commonly used for user authentication.
* `bcryptjs` this library for password hashing as well, it is used in conjunction with bcrypt.
* `cloudinary`is a cloud service that provides image management. Useful for handling and storing user's image avatars and artworks files.
* `cors`is a middleware for Express.js that was used to manage and control access to resources on the server from different domains. It allows or restricts cross-origin HTTP requests, which is essential for security. 
* `dotenv` Zero-dependency Node.js module that simplifies the process of loading environment variables, managing the configuration settings, API keys, database connection strings, and other sensitive information.
* `express`is a web application framework for Node.js that helps to simplify the creation of APIs (routes for different HTTP methods) and web servers. 
* `express-async-handler` handleS asynchronous errors in Express.js middleware and route handlers.

* `jsonwebtoken` creates and verifies JSON Web Tokens (JWT) used for secure communication between parties.

* `mongoose` is an Object Data Modeling (ODM) library for MongoDB and Node.js that helps to simplify interactions with MongoDB databases. It was used for the schemas definition and models creation, also CRUD operations middleware and more. 

### Front-End 

* `axios` is the library used to make HTTP requests. 
* `tailwindcss`  utility-first CSS framework, used to styled  the front end. 
* `reduxjs Version 2.0.1/toolkit ` is an efficient tool to develop, simplify the process of managing state in React applications.
*`jest-dom Version 5.17.0/testing-library` matchers for validating the state of the DOM in your tests

*`user-event Version 13.5.0/testing-library`

## Testing 
___


