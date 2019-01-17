const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server.js');
const { Todo } = require('../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo"
    }, 
    {
        _id: new ObjectID(),
        text: "Second test todo"
    }
]

beforeEach(done => {
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos);
        }).then(() => done())
        .catch(() => console.log('Unable to remove data!'));
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Sample todo string';

        request(app)
            .post('/todos')
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
            .expect(200)
            .expect(response => expect(response.body.todos.length).toBe(2))
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should successfully get specific todo given a valid id', done => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(response => expect(response.body.text).toBe(todos[0].text))
            .end(done);
    });

    it('should return a 404 if todo not found', done => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect(response => expect(response.body.length).toBeUndefined())
            .end(done);
    });

    it('should return 400 for non-object IDs', done => {
        request(app)
            .get('/todos/123456')
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete a specific todo with a valid object id', done => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .end((error, response) => {
                if (error)
                    return console.log(error.message);
                
                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(1);
                        done();
                    })
                    .catch(err => done(err));
            });
    });

    it('should return 400 for invalid IDs', done => {
        request(app)
            .delete('/todos/123456')
            .expect(400)
            .end(done);
    });
});