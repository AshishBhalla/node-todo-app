const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const { todos, populateTodos} = require('./seed/seed');


//removing all the exisitng data from the Todo collection
// beforeEach((done) =>{
//     Todo.remove({}).then(() =>{
//         done();
//     });
// })

//insert data in the collection to test the get request
beforeEach(populateTodos);


describe('POST /todo', () =>{
    it('should create a new todo',(done) => {
        var text = 'Test to do text';

        request(app)
         .post('/todos')
         .send({
             text :text
         })
         .expect(200)
         .expect((res) =>{
             expect(res.body.text).toBe(text);

         })
         .end((err,res) =>{
             if (err){
                 return done(err);
             }
             Todo.find().then((todos) => {
                 //expecting only 1 record as we are deleting all the docs above
                 expect(todos.length).toBe(3);
                 expect(todos[0].text).toBe(text);
                 done();
             }).catch((e) => done(e));
         });
    });
    it('should not create todo with invalid data',(done) =>{
        request(app)
        .post('/todos')
        .send({text : "  "})
        .expect(400)
        .end((err,res) =>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos) =>{
                // expect(todos.length).toBe(0);
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
    });1
});
});


describe('GET /todo', () =>{
    it('should get all todos',(done) =>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) =>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe('Get /todo/:id' ,() =>{
    it('should get one todo using id' ,(done) =>{
        request(app)
        //getting id object from the todos array above and converting it into string
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            //res.boy.todos = this todos is coming from server.js i.e return of the /todos/:id
            expect(res.body.todos.text).toBe(todos[0].text)
        })
        .end(done)
    });

    it('should return a 404 if todo not found' ,(done) =>{
        request(app)
            .get('/todos/6c28ef628ad9085c2ee3b7dd')
            .expect(404)
            .end(done);
    });

    it('should reyrun 404 if id is not correct' ,(done) =>{
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });

});
