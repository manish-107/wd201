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

    expect(all[0].completed).toBe(false); // Initially not completed
    markAsComplete(0); // Mark the first todo as complete
    expect(all[0].completed).toBe(true); // Now it should be marked as completed
  });

  test("retrieval of overdue items", () => {
    // Add an overdue item (due date before today)
    add({
      title: "overdue test todo",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10), // Yesterday's date
    });

    const overdueItems = overdue(); // Retrieve overdue items
    expect(overdueItems.length).toBe(1); // We expect 1 overdue item
    expect(overdueItems[0].title).toBe("overdue test todo"); // Ensure the correct item is overdue
  });

  test("checks retrieval of due today items", () => {
    // Add a todo item due today
    add({
      title: "due today items",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date
    });

    const dueTodayItem = dueToday(); // Retrieve due today items
    expect(dueTodayItem.length).toBe(1); // We expect 1 item due today
    expect(dueTodayItem[0].title).toBe("due today items"); // Ensure the correct item is returned
  });

  test("checks retrieval of due later items", () => {
    // Add a todo item with a due date in the future (1 day later)
    add({
      title: "due later items",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)) // Tomorrow's date
        .toISOString()
        .slice(0, 10),
    });

    const dueLaterItem = dueLater(); // Retrieve due later items
    expect(dueLaterItem.length).toBe(1); // We expect 1 item due later
    expect(dueLaterItem[0].title).toBe("due later items"); // Ensure the correct item is returned
  });
});
