# Task Manager 
A NodeJS API with a remote database which is allowed users to create their accounts with encrypted passwords and tasks, see their profiles and tasks, see the specifics of a single task and upload an avatar using MongoDB.
## Tools 
Task Manager API uses several tools to work properly:
- Express node.js web application framework
- Third party: 
  - mailgun for sending mails
  - mongoose for create database models
- remote database : MongoDB Atlas cloud
- mongoDBCompass
- postman
- Jest for testing
## Routes:
  ### Users :
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/users` | Create user. |
| `POST`   | `/users/login ` | Login. |
| `POST`    | `/users/logout` | Logout. |
| `POST`  | `/users/logoutAll` | LogoutAll. |
| `POST`  | `/users/me/avatar` | Upload Avatar. |
| `GET`   | `/users/me` | Show user profile. |
| `GET`    | `/users/:email/avatar` | Show profile picture. |
| `PATCH`    | `/users/me` | Update user. |
| `DELETE` | `/users/me` | Delete user. |
| `DELETE` | `/users/me/avatar` | Delete Avatar.|
  ### Tasks : 
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/tasks` | Create task. |
| `GET`   | `/tasks` | ٍShow all tasks. |
| `GET`    | `/tasks?completed=true` | Show all completed tasks. |
| `GET`  | `/tasks?limit=2&skip=1` | Show two tasks only in page and skip first task. |
| `GET`   | `/tasks?sortBy=createdAt:desc` | Show tasks based on when they were created in descending order. |
| `GET`    | `/tasks/:id` | Show task by id. |
| `PATCH`    | `/tasks/:id` | Update task. |
| `DELETE` | `/tasks/:id` | Delete task. |
## Enviromental Variables Set up:
- create a `.env` file in your root folder then copy the content from  `dev.env and replace the values with your environment configuration / secrets`
```sh
PORT=3000
MAILGUN_DOMAIN="sandboxf0a1273bf17b4ed280300a28fc5bbd4b.mailgun.org"
MAILGUN_API_KEY="18b59c61acc51f5df1126fffe8dba48e-48c092ba-7df397c9"
MONGO_DB="mongodb+srv://task_app:123456789Shrouk@cluster0.f0jzsf8.mongodb.net/task-app?retryWrites=true"
JWT_SECRET="thisisnewcourse"
```
- in `test.env` should replace MONGO_DB to:
```sh
MONGO_DB="mongodb+srv://task_app:123456789Shrouk@cluster0.f0jzsf8.mongodb.net/task-app-test?retryWrites=true"
```
## DataBase:
start mongoDBCompass and choose connect DB:
- put value of MONGO_DB key:
```sh
mongodb+srv://task_app:123456789Shrouk@cluster0.f0jzsf8.mongodb.net/task-app?retryWrites=true
```
- click connect and save

## to build node_modules:
```sh
npm run build
```
## to start server:
```sh
npm run dev
```
## to start test:
```sh
npm run test
```
