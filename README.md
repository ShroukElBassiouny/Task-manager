# Task Manager 
A NodeJS API with remote database and Deployed to Heroku which is allowed to users to create their accounts with encrypted password and tasks, see their profiles and tasks, see the specifics of a single task and upload avatar using mongoDB.

## Tools 
Task Manager API uses a number of tools to work properly:
- javaScript
- Express 
- Third party: 
  - mailgun for sending mails
  - mongoose for create database models
- remote database : MongoDB Atlas cloud
- mongoDBCompass
- postman
- Jest for testing

## Heroku link:
https://shrouk-task-manager.herokuapp.com 

## Routes:
 ### Users : 
   + post /users               - Create user
   + post /users/login         - login
   + post /users/logout        logout
   + post /users/logoutAll     logoutAll
   + get /users/me             Get user profile
   + patch /users/me           Update user
   + delete /users/me          Delete user
   + post /users/me/avatar     Upload Avatar
   + delete /users/me/avatar   Delete Avatar
   + get /users/:email/avatar  Get profile picture
  ### tasks : 
   + post /tasks               Create task
   + get /tasks                Get all tasks 
   + Get /tasks?completed=true
   + Get /tasks?limit=2&skip=1
   + Get /tasks?sortBy=createdAt:desc
   + get /tasks/:id            Get task by id 
   + patch /tasks/:id          Update task
   + delete /tasks/:id         Delete task

## Enviromental Variables Set up
- create a `.env` file in your root folder then copy the content from  `dev.env and replace the values with your environment configuration / secrets`

PORT=3000
MAILGUN_DOMAIN="sandboxf0a1273bf17b4ed280300a28fc5bbd4b.mailgun.org"
MAILGUN_API_KEY="18b59c61acc51f5df1126fffe8dba48e-48c092ba-7df397c9"
MONGO_DB="mongodb+srv://task_app:123456789Shrouk@cluster0.f0jzsf8.mongodb.net/task-app?retryWrites=true"
JWT_SECRET="thisisnewcourse"

- in `test.env` should replace MONGO_DB to:
MONGO_DB="mongodb+srv://task_app:123456789Shrouk@cluster0.f0jzsf8.mongodb.net/task-app-test?retryWrites=true"

## DataBase
start mongoDBCompass and choose connect DB:
- put value of MONGO_DB key 
click connect and save

## to build node modules:
```sh
npm run build
```
## to start server:
```sh
npm run dev
```
## to test :
```sh
npm run test
```
