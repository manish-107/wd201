const todoList = require("../todo.js");

const { all, markAsComplete, add, overdue } = todoList();

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

  test("retrieval of overdue items", () => {
    add({
      title: "overdue test todo",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });

    const overdueItem = overdue();
    expect(overdueItem.length).toBe(1);
    expect(overdueItem[0].title).toBe("overdue test todo");
  });
});
