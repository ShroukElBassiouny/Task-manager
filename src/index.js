const express = require('express')
require('./db/mongoose')
const app = express()
const userRoutes = require('./routers/user')
const taskRoutes = require('./routers/task')

const port = process.env.PORT
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)

app.listen(port,()=>{
    console.log('Sever is up on port', port)
})