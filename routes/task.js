const express = require('express');
const taskController = require('../controllers/task.controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const router = express.Router();
 router.post("/:taskListId", checkAuthMiddleware.checkAuth, taskController.save);
 router.get("/:taskListId/:taskId", checkAuthMiddleware.checkAuth,taskController.getTask);
 router.put("/:taskListId/:taskId",checkAuthMiddleware.checkAuth,taskController.updateTask);
 router.get("/:taskListId",checkAuthMiddleware.checkAuth,taskController.getAllTask);
 router.delete("/:taskListId/:taskId",checkAuthMiddleware.checkAuth,taskController.deleteTask);



module.exports = router;