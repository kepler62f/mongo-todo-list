// TODO. import TODO Model ;-)
const Todo = require('../models/todo')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/mongo-todo-list'

mongoose.connect(url, {
  useMongoClient: true
})
mongoose.Promise = global.Promise


function create (params) {

  // create a new TODO and console log the response
  var newTodo = new Todo({
    name: params.name,
    description: params.description,
    completed: params.completed
  })

  newTodo.save(function(err, data) {
    if (err) {
      console.error(err)
    } else {
      console.log('new param created');
      console.log('new param', data);
    }
  })

  //mongoose.connection.close()
}

function list () {
  // console log the list of all TODOs
  Todo.find({},function(err, data) {
    if (err) {
      console.error(err)
    } else {
      console.log(data);
    }
  })
}
function show (id) {

  // find the TODO with this id and console log it
  Todo.findById(id,function(err, data) {
    if (err) {
      console.error(err)
    } else {
      console.log(data);
    }
  })
}
function update (id, params) {
  // find the TODO with this id and update it's params. console log the result.
  var query = {_id : id}
  var newUpdate = {
    $set: {
      name: params.name,
      description: params.description,
      completed: params.completed
     }}
  Todo.findOneAndUpdate(query, newUpdate, function(err, data) {
    if (err) {
      console.error(err)
    } else {
      console.log(data);
    }
  })

}
function destroy (id) {
  // find the TODO with this id and destroy it. console log success/failure.
  var query = {_id : id}

  Todo.findOneAndRemove(query, function(err, data) {
    if (err) {
      console.error(err)
    } else {
      if (data) {
        console.log('destroy successful');
      } else {
        console.log('destroy failed');
      }
    }
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
