const express = require('express');
const router = new express.Router();

const _ = require('lodash');
const { User } = require('../models/user');
const { mailer } = require('../mailer/mailer');
const { authenticate } = require('../middleware/authenticate');

//Users
router.post('/users', async (req, res) => {
    const body = _.pick(req.body, ['username', 'email', 'password']);
    const user = new User(body);

    try {
        await user.save();
        const generatedToken = await user.generateAuthToken();
        if (process.env.NODE_ENV === 'production')
            await mailer(body.email, generatedToken);
        res.header('x-auth', generatedToken).status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

router.post('/users/login', (req, res) => {
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

router.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

router.patch('/users/:id', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const whiteListedVariables = [
        'name', 'email', 'password'
    ];
    const isValid = updates.every(update => whiteListedVariables.includes(update));

    if (!isValid)
        return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
         });

         if (!user)
            return res.status(404).send();

        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/users/:id', authenticate, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user)
            return res.status(404).send();

        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;