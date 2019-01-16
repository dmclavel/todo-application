const expect = require('expect');
const request = require('supertest');

const { app } = require('../server.js');
const { Todo } = require('../models/todo');

beforeEach(done => {
    Todo.remove({})
        .then(() => done());
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
                
                Todo.find().then(todos => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch(error => done(error));
            })
    });
});