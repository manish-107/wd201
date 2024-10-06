const todoList = require("../todo.js");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test suite", () => {
  beforeEach(() => {
    all.length = 0;
  });

  test("Should add new todo", () => {
    const todoItemLength = all.length;
    add({
      title: "new test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemLength + 1);
  });

  test("todo should markAsComplete", () => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

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

    const overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("overdue test todo");
  });

  test("checks retrieval of due today items", () => {
    add({
      title: "due today items",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    const dueTodayItem = dueToday();
    expect(dueTodayItem.length).toBe(1);
    expect(dueTodayItem[0].title).toBe("due today items");
  });

  test("checks retrieval of due later items", () => {
    add({
      title: "due later items",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });

    const dueLaterItem = dueLater();
    expect(dueLaterItem.length).toBe(1);
    expect(dueLaterItem[0].title).toBe("due later items");
  });
});
