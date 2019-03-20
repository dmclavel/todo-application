const express = require('express');
const router = new express.Router();

const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Todo } = require('../models/todo');
const { authenticate } = require('../middleware/authenticate');

//Todos
router.post('/todos', authenticate, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    try {
        await todo.save();
        const todos = await Todo.find({
            _creator: req.user._id
        });
        res.status(201).send(todos);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then(todos => {
        res.status(200).send({
            todos
        });
    }).catch(err => {
        res.status(400).send(err);
    });
});

router.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    
    if (ObjectID.isValid(id)) {
        Todo.findOne({ _id: id, _creator: req.user._id })
            .then(todo => {
                if (todo)
                    res.status(200).send(todo) 
                else
                    res.status(404).send({ error: `_id: ${id} cannot be accessed!` });
            })
            .catch(() => res.status(404).send({ error: 'The todo text must have been already deleted!' }));

    } else {
        res.status(400).send({ error: 'Invalid id!' });
    }
});

router.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndDelete({
        _id: id,
        _creator: req.user.id
    }).then(todo => {
        if (!todo)
            return res.status(404).send({ error: 'The todo text must have been already deleted!'});
        return Todo.find({
            _creator: req.user._id
        });      
    })
    .then(todos => {
        res.status(200).send(todos);
    })
    .catch(err => {
        res.status(400).send({ error: 'The todo text does not exist!' });
    });
});



router.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (ObjectID.isValid(id)) {
        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true })
            .then(todo => {
                if (!todo)
                    return res.status(404).send({ error: 'The todo text must have been already deleted!' });
                
                return Todo.find({
                    _creator: req.user._id
                }); 
            })
            .then(todos => {
                res.status(200).send(todos);
            })
            .catch(() => res.status(400).send({ error: 'The todo text does not exist!' }));
    } else {
        return res.status(400).send({ error: 'Invalid id!' });
    }
});

module.exports = router;