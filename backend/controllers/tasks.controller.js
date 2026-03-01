const taskService = require("../services/tasks.service")

exports.getAll = (req,res,next) => {
    try {
        const tasks = taskService.getAll();
        return res.status(200).json(tasks)
    } catch (err) {
        next(err);
    }
}

exports.create = (req,res,next) => {
    try {
        const task = taskService.create(req.body)
        return res.status(201).json(task);      
    } catch (err) {
        next(err);
    }
}

exports.removeById = (req, res, next) => {
    try {
        taskService.removeById(req.params.id);
        return res.status(204).end();
    } catch (err) {
        next(err);
    }
}

exports.toggleComplete = (req, res, next) => {
    try {
        const task = taskService.toggleComplete(req.params.id);
        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
}

exports.updateById = (req, res, next) => {
  try {
    const task = taskService.updateById(req.params.id, req.body);
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}
