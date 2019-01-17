const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
require('./db/mongoose');

const { Todo } = require('./models/todo');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.status(200).send({
            todos
        });
    }).catch(err => {
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
        res.status(400).send(`_id: ${id} is not a valid id!`);
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (ObjectID.isValid(id)) {
        Todo.findByIdAndDelete(id)
            .then(doc => res.status(200).send({ doc }))
            .catch(() => res.status(404).send(`_id: ${id} does not exist in the Mongo database!`));
    } else {
        res.status(400).send(`_id: ${id} is not a valid id!`);
    }
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (ObjectID.isValid(id)) {
        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
            .then(todo => {
                if (!todo)
                    return res.status(404).send();
                
                res.status(200).send({ todo });
            })
            .catch(err => res.status(400).send());
    } else {
        return res.status(400).send(`_id: ${id} is not a valid id!`);
    }
});

if (!module.parent) {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    app
};