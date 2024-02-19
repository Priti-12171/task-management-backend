const express = require('express');
const taskListController = require('../controllers/taskList.controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const router = express.Router();

router.post("/",checkAuthMiddleware.checkAuth,taskListController.save);
router.get("/:taskListId",checkAuthMiddleware.checkAuth,taskListController.getTasklist);
router.put("/:taskListid",checkAuthMiddleware.checkAuth,taskListController.updateTaskList);
router.get("/",checkAuthMiddleware.checkAuth,taskListController.getAllTaskList);
router.delete("/:taskListId",checkAuthMiddleware.checkAuth,taskListController.deleteTaskList);

module.exports = router;