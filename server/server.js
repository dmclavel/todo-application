require('./config/config');
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/mongoose');;
const port = process.env.PORT;

//Routers
const userRouter = require('./routers/user');
const todoRouter = require('./routers/todos');

const app = express();

//Middlewares
app.use(cors({
    exposedHeaders: 'X-Auth'
}));
app.use(bodyParser.json());
app.use(userRouter);    //add routers
app.use(todoRouter);

if (!module.parent) {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    app
};