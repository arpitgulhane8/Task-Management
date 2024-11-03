const User = require("../model/User");
const Task = require("../model/Task");
const moment = require("moment");

exports.createTask = async (req, res) => {
  try {
    const { title, priority, assignTo, checklist, dueDate } = req.body;
    const newTask = new Task({
      title,
      priority,
      assignTo,
      checklist,
      dueDate,
      createdBy: req.user._id,
      status: "Todo",
    });
    const savedTask = await newTask.save();
    res.status(201).json({
      message: "Task Created Successfully",
      savedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

exports.getTaskAnalytics = async (req, res) => {
  const userId = req.user._id;
   const useremail = req.user.email;

  try {
    const analytics = await Task.aggregate([
      {
        $facet: {
          backlogTasks: [
            {
              $match: {
                status: "Backlog",
                $or: [{ createdBy: userId }, { assignTo:useremail }],
              },
            },
            { $count: "count" },
          ],
          lowPriorityTasks: [
            {
              $match: {
                priority: "LOW PRIORITY",
                $or: [{ createdBy: userId }, { assignTo:useremail}],
              },
            },
            { $count: "count" },
          ],
          moderatePriorityTasks: [
            {
              $match: {
                priority: "MODERATE PRIORITY",
                $or: [{ createdBy: userId }, { assignTo:useremail }],
              },
            },
            { $count: "count" },
          ],
          highPriorityTasks: [
            {
              $match: {
                priority: "HIGH PRIORITY",
                $or: [{ createdBy: userId }, { assignTo:useremail }],
              },
            },
            { $count: "count" },
          ],
          inProgressTasks: [
            {
              $match: {
                status: "Inprogress",
                $or: [{ createdBy: userId }, { assignTo: useremail }],
              },
            },
            { $count: "count" },
          ],
          completedTasks: [
            {
              $match: {
                status: "Done",
                $or: [{ createdBy: userId }, { assignTo:useremail }],
              },
            },
            { $count: "count" },
          ],
          ToDoTasks: [
            {
              $match: {
                status: "Todo",
                $or: [{ createdBy: userId }, { assignTo:useremail }],
              },
            },
            { $count: "count" },
          ],
          dueDateTasks: [
            {
              $match: {
                dueDate: {
                  $exists: true,
                  $ne: null,
                  $type: "date",
                },
                $or: [{ createdBy: userId }, { assignTo:useremail }],
              },
            },
            { $count: "count" },
          ],
        },
      },
    ]);

    const formattedAnalytics = {
      BacklogTasks: analytics[0].backlogTasks[0]?.count || 0,
      LowPriorityTasks: analytics[0].lowPriorityTasks[0]?.count || 0,
      ModeratePriorityTasks: analytics[0].moderatePriorityTasks[0]?.count || 0,
      HighPriorityTasks: analytics[0].highPriorityTasks[0]?.count || 0,
      InProgressTasks: analytics[0].inProgressTasks[0]?.count || 0,
      CompletedTasks: analytics[0].completedTasks[0]?.count || 0,
      DueDateTasks: analytics[0].dueDateTasks[0]?.count || 0,
      ToDoTasks: analytics[0].ToDoTasks[0]?.count || 0,
    };

    res.status(200).json({
      message: "Task Analytics fetched successfully!",
      formattedAnalytics,
    });
  } catch (error) {
    console.error("Error fetching task analytics:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksByFilter = async (req, res) => {
  const { selectedFilter } = req.query;
  const userId = req.user._id;
   const useremail = req.user.email;
  let startDate;
  const endDate = moment.utc().endOf("day");

  if (selectedFilter === "Today") {
    startDate = moment.utc().startOf("day");
  } else if (selectedFilter === "This Week") {
    startDate = moment.utc().startOf("week");
  } else if (selectedFilter === "This Month") {
    startDate = moment.utc().startOf("month");
  } else {
    return res.status(400).json({ error: "Invalid filter option" });
  }

  try {
    const tasks = await Task.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate(),
          },
          $or: [{ createdBy: userId }, { assignTo:useremail }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByInfo",
        },
      },
      {
        $unwind: {
          path: "$createdByInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          title: 1,
          priority: 1,
          assignTo: 1,
          checklist: 1,
          dueDate: 1,
          createdBy: { name: "$createdByInfo.name" },
          status: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, priority, assignTo, checklist, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, priority, assignTo, checklist, dueDate },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({
      message: "Task updated Successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.shareTask = async (req, res) => {
  try {
    const shareTask = await Task.findById(req.params.id);

    if (!shareTask) return res.status(404).send("Task not found");
    return res.status(201).json({ shareTask });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.toggelChecklistItem = async (req, res) => {
  try {
    const { completed } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const checklistItem = task.checklist.id(req.params.itemId);

    if (!checklistItem) {
      return res.status(404).json({ message: "Checklist item not found" });
    }
    checklistItem.completed = completed ?? !checklistItem.completed;
    console.log(checklistItem);
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating checklist item", error });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Backlog", "Todo", "Inprogress", "Done"];

  try {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status", error });
  }
};
