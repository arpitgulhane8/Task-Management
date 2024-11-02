const express = require("express");
const router = express.Router();
const {
  getTaskAnalytics,
  createTask,
  getTasksByFilter,
  deleteTask,
  updateTask,
  shareTask,
  toggelChecklistItem,
  updateTaskStatus,
} = require("../../controllers/taskController");
const authMiddleware = require("../../Middleware/authMiddleware");

router.post("/createtask", authMiddleware, createTask);
router.get("/getTaskAnalytics", authMiddleware, getTaskAnalytics);
router.get("/getTasksByFilter", authMiddleware, getTasksByFilter);
router.delete("/deleteTask/:id", authMiddleware, deleteTask);
router.put("/updateTask/:id", authMiddleware, updateTask);
router.get("/shareTask/:id", shareTask);
router.put("/:id/checklist/:itemId", authMiddleware, toggelChecklistItem);
router.put("/updateTaskStatus/:id", authMiddleware, updateTaskStatus);

module.exports = router;
