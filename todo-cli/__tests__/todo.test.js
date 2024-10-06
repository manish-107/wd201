const todoList = require("../todo.js");

const { all, markAsComplete, add } = todoList();

describe("Todolist Test suite", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString(),
    });
  });

  test("Should add new todo", () => {
    const todoItemLength = all.length;
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    expect(all.length).toBe(todoItemLength + 1);
  });

  test("todo should markAsComplete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
