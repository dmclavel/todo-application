const expect = require('expect');
const request = require('supertest');

const { app } = require('../server.js');
const { Todo } = require('../models/todo');

const todos = [
    {
        text: "First test todo"
    }, 
    {
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