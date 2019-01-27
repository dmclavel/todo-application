require('./config/config');
const _ = require('lodash');
const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const bodyParser = require('body-parser');
const { mailer } = require('./mailer/mailer');
const { ObjectID } = require('mongodb');
require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const httpProxy = require('http-proxy');
const port = process.env.PORT;

dotenv.load();
const app = express();

//Middlewares
app.use(cors({
    exposedHeaders: 'X-Auth'
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    httpProxy.createProxyServer({
        target: 'https://dmc-todo-app.herokuapp.com',
        toProxy: true,
        changeOrigin: true,
        xfwd: true
    });
}

//Todos
app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save()
        .then(result => res.status(200).send(result))
        .catch(() => res.status(400).send({ error: 'Error saving todo text!' }));
});

app.get('/todos', authenticate, (req, res) => {
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

app.get('/todos/:id', authenticate, (req, res) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndDelete({
        _id: id,
        _creator: req.user.id
    }).then(todo => {
        if (!todo)
            return res.status(404).send({ error: 'The todo text must have been already deleted!'});
        res.send({ todo });
    }).catch(err => {
        res.status(400).send({ error: 'The todo text does not exist!' });
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
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
                
                res.status(200).send({ todo });
            })
            .catch(() => res.status(400).send({ error: 'The todo text does not exist!' }));
    } else {
        return res.status(400).send({ error: 'Invalid id!' });
    }
});

//Users
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['username', 'email', 'password']);
    const user = new User(body);

    user.save()
        .then(() => {
            return user.generateAuthToken();
        })
        .then(token => {
            return mailer(body.email, token);
        })
        .then(token => {
            res.header('x-auth', token).send(user);
        })
        .catch(err => {
            res.status(400).send(err.message);
        });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateAuthToken().then(token => {
                res.header('x-auth', token).send(user);
            });
        })
        .catch(() => {
            res.status(400).send({ error: 'Email and password don\'t match!' });
        });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

if (!module.parent) {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = {
    app
};