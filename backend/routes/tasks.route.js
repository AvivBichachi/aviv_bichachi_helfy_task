const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks.controller")

// routes
router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.delete('/:id', taskController.removeById);
router.patch('/:id/toggle', taskController.toggleComplete);
router.put('/:id', taskController.updateById);

module.exports = router;