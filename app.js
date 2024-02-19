const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');
var cors = require('cors');
app.use(cors());
const taskListRoute = require('./routes/taskList');

app.use(bodyParser.json());
app.use("/users",userRoute);
app.use("/tasks",taskRoute);
app.use("/taskLists",taskListRoute);


module.exports = app 