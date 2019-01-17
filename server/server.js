const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
require('./db/mongoose');

const { Todo } = require('./models/todo');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(result => res.send(result))
        .catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
    console.log('GET /todos');
    Todo.find().then(todos => {
        console.log(todos);
        res.send({
            todos
        });
    }).catch(err => {
        console.log(err.message);
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    
    if (ObjectID.isValid(id)) {
        Todo.findById({ _id: id })
            .then(todo => {
                if (todo)
                    res.status(200).send(todo) 
                else
                    res.status(404).send(`_id: ${id}, is not found in the Todo collection.`);
            })
            .catch(err => res.status(404).send(`_id: ${id}, is not found in the Todo collection. More detailed error info:  ${err}`));

    } else {
        res.status(400).send(`_id: ${id}, does not exist in the Mongo database!`);
    }
});

if (!module.parent) {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    app
};