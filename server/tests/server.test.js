const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server.js');
const { Todo } = require('../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Sample todo string';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((error, response) => {
                if (error)
                    return done(error);
                
                Todo.find({ text }).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(error => done(error));
            });
    });

    it('should not create todo with invalid body data', done => {
        const text = '';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({ text })
            .expect(400)
            .expect(response => {
                expect(response.body.text).toBeUndefined();
            })
            .end((error, response) => {
                if (error) 
                    return done(error);
                
                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(error => done(error));
            })
    });
});

describe('GET /todos', () => {
    it('should successfully get todo data', done => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(response => expect(response.body.todos.length).toBe(1))
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should successfully get specific todo given a valid id', done => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(response => expect(response.body.text).toBe(todos[0].text))
            .end(done);
    });

    it('should return a 404 if todo not found', done => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .expect(response => expect(response.body.length).toBeUndefined())
            .end(done);
    });

    it('should return 400 for non-object IDs', done => {
        request(app)
            .get('/todos/123456')
            .set('x-auth', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });

    it('should not get specific todo created by other user', done => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a specific todo with a valid object id', done => {
        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .end((error, response) => {
                if (error)
                    return done(error);
                
                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(1);
                        done();
                    })
                    .catch(err => done(err));
            });
    });

    it('should not delete todos of other users', done => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 400 for invalid IDs', done => {
        request(app)
            .delete('/todos/123456')
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('POST /users', () => {
    it ('should sign up succesfully given correct data', done => {
        const data = {
            username: 'test',
            email: 'test@test.com',
            password: '123456'
        };
        request(app)
            .post('/users')
            .send(data)
            .expect(200)
            .end(done);
    });
});