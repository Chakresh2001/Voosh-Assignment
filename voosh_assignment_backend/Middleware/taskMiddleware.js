const TaskModel = require("../Model/taskModel");

const checkTaskOwnership = async (req, res, next) => {
    const { taskId } = req.params;
    const task = await TaskModel.findById(taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    console.log(task, "task")
    console.log(req.user)

    if (task.userId !== req.user.userID) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
};

module.exports = { checkTaskOwnership };
