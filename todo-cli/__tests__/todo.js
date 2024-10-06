const todoList = require("../todo.js");

const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

describe("Todolist Test suite", () => {
  beforeEach(() => {
    all.length = 0; // Clear the list before each test
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

  test("retrieval of due today items", () => {
    add({
      title: "due today item",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe("due today item");
  });

  test("retrieval of due later items", () => {
    add({
      title: "due later item",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });

    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("due later item");
  });

  test("toDisplayableList formats correctly", () => {
    const today = new Date().toISOString().slice(0, 10);

    add({
      title: "overdue task",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });

    add({
      title: "due today task",
      completed: true,
      dueDate: today,
    });

    add({
      title: "due later task",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });

    const formattedList = toDisplayableList(all);

    expect(formattedList).toBe(
      `[ ] overdue task ${new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10)}\n` +
        `[x] due today task\n` +
        `[ ] due later task ${new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10)}`,
    );
  });
});
