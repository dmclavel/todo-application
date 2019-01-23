const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
    {
        _id: userOneId,
        email: 'andrew@example.com',
        password: 'userOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
            }
        ]

    }, 
    {
        _id: userTwoId,
        email: 'dmclavel@email.com',
        password: 'userTwoPass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
            }
        ]
    } 
];

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo",
        _creator: userOneId
    }, 
    {
        _id: new ObjectID(),
        text: "Second test todo",
        _creator: userTwoId
    }
];

const populateTodos = done => {
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos);
        }).then(() => done())
        .catch(() => console.log('Unable to remove test data!'));
};

const populateUsers = done => {
    User.remove({})
        .then(() => {
            const userOne = new User(users[0]).save();
            const userTwo = new User(users[1]).save();
            return Promise.all([userOne, userTwo]);
        })
        .then(() => done())
        .catch(() => console.log('Unable to seed Users database!'));
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}