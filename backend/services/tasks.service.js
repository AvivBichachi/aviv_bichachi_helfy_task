const tasks = [];
let nextId = 1;

const allowedPriority = ["low", "medium", "high"];

// Handle invalid inputs
function badRequest(message) {
    const err = new Error(message)
    err.status = 400;
    throw err
}
// Handle missing content
function notFound(message) {
    const err = new Error(message)
    err.status = 404;
    throw err
}



exports.getAll = () => {
    return tasks
}

exports.create = (payload) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) badRequest("Invalid task");

    if (typeof payload.title !== "string") badRequest("Invalid title");
    const title = payload.title.trim();
    if (!title) badRequest("Title is missing");

    if (typeof payload.priority !== "string") badRequest("Invalid priority");
    const priority = payload.priority.toLowerCase().trim();
    if (!allowedPriority.includes(priority)) badRequest("Invalid priority");

    if (typeof payload.description !== "string") badRequest("Invalid description");
    const description = payload.description.trim();

    const task = {
        id: nextId++,
        title: title,
        description: description,
        completed: false,
        createdAt: new Date().toISOString(),
        priority,
    }

    tasks.push(task);
    return task;
}

exports.removeById = (id) => {
    const taskId = Number(id);
    if (!Number.isInteger(taskId) || taskId <= 0) badRequest("Invalid id");

    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) notFound("Task was not found");
    tasks.splice(index, 1);
    return true;
}

exports.toggleComplete = (id) => {
    const taskId = Number(id);
    if (!Number.isInteger(taskId) || taskId <= 0) badRequest("Invalid id");

    const task = tasks.find(t => t.id === taskId);
    if (!task) notFound("Task was not found");

    task.completed = !task.completed;
    return task;
}

exports.updateById = (id, payload) => {
    const taskId = Number(id);
    if (!Number.isInteger(taskId) || taskId <= 0) badRequest("Invalid id");
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) badRequest("Invalid task");

    const task = tasks.find(t => t.id === taskId);
    if (!task) notFound("Task was not found");
    if (typeof payload.title !== "string") badRequest("Invalid title");
    const title = payload.title.trim();
    if (!title) badRequest("Title is missing");
    if (typeof payload.description !== "string") badRequest("Invalid description");
    const description = payload.description.trim();
    if (typeof payload.priority !== "string") badRequest("Invalid priority");
    const priority = payload.priority.toLowerCase().trim();
    if (!allowedPriority.includes(priority)) badRequest("Invalid priority");

    task.title = title;
    task.description = description;
    task.priority = priority;

    return task;
}