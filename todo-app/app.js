const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());

app.set("view engine", "ejs");

// app.get("/",  async(request, response)=> {
//   const allTodoss = await Todo.getTodos();
//   if(request.accepts("html")){

//   }
//   response.render("index");
// });

app.get("/", async (request, response) => {
  const allTodoss = await Todo.getTodos();
  if (request.accepts("html")) {
    response.render("index", {
      allTodoss,
    });
  } else {
    response.send({ allTodoss });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE
  try {
    const todoList = await Todo.findAll();
    // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
    // Then, we have to respond with all Todos, like:
    response.send(todoList);
  } catch (error) {
    console.log(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.

  try {
    const deletedTodo = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });

    response.send(deletedTodo ? true : false);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
