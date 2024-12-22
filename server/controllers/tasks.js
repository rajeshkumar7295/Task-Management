const Task=require("../models/Tasks");
const moment=require("moment");
const cloudinary=require("cloudinary").v2;

const uploadFileToCloudinary = async (filePath, folderName) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: folderName, 
        resource_type: 'auto', 
    });
};

exports.createTask = async (req, res) => {
    try {

        const userId=req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized access.' });
        }
        const { title, description, dueDate,status } = req.body;
        
        
        if (!title || !description || !dueDate||!status) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required (title, description, dueDate,status).' 
            });
        }

        let fileUrl = null;

       
        if (req.file) {
            const uploadFile = await uploadFileToCloudinary(req.file.path, process.env.FOLDER_NAME);
            fileUrl = uploadFile.secure_url; 
        }

        // Create a new task
        const task = new Task({
            title,
            description,
            dueDate,
            status,
            taskFile: fileUrl,
            user:userId
        });

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task created successfully.",
            data: task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create task.',
            error: error.message,
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, dueDate, status } = req.body; 

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found.' });
        }

        
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized to update this task.' });
        }

        
        let updatedFileUrl = task.taskFile; 
        if (req.file) {
            const uploadResult = await uploadFileToCloudinary(req.file.path, process.env.FOLDER_NAME);

            
            updatedFileUrl = uploadResult.secure_url;
        }

        
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        task.taskFile = updatedFileUrl;

       
        await task.save();

        res.status(200).json({
            success: true,
            message: 'Task updated successfully.',
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update task.',
            error: error.message,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found.',
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task.',
            });
        }

      
        await Task.findByIdAndDelete(taskId);

        
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete task.',
            error: error.message,
        });
    }
};



exports.getAllTasks = async (req, res) => {
    try {
      const userId = req.user?.id; // Authenticated user's ID
      const { status, page = 1, limit = 5, search = "" } = req.query; 
  
      
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);
  
      let query = { user: userId };
  
      if (status === "today") {
        const today = new Date();
        query.dueDate = {
          $gte: new Date(today.setHours(0, 0, 0, 0)), // Start of today
          $lte: new Date(today.setHours(23, 59, 59, 999)), // End of today
        };
      } else if (status === "overdue") {
        query.dueDate = { $lt: new Date() }; // Tasks with due dates in the past
      }
  
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
  
      
      const tasks = await Task.find(query)
        .skip((pageNumber - 1) * limitNumber) // Skip the previous pages
        .limit(limitNumber) // Limit to the specified number of tasks per page
        .sort({ dueDate: 1 }); // Sort by due date
  
      
      const totalTasks = await Task.countDocuments(query);
  
      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully.",
        data: tasks,
        totalTasks, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve tasks.",
        error: error.message,
      });
    }
  };
  
exports.getTaskStats = async (req, res) => {
    try {
      const userId = req.user.id; 
  
      
      const totalTasks = await Task.countDocuments({ user: userId });
  
      
      const totalCompletedTasks = await Task.countDocuments({ user: userId, status: 'completed' });
  
      const overdueTasks = await Task.countDocuments({
        user: userId,
        dueDate: { $lt: new Date() },
        status: { $ne: 'completed' },
      });
  
      const today = moment().startOf('day');
      const tomorrow = moment(today).add(1, 'days');
  
      const dueTodayTasks = await Task.countDocuments({
        user: userId,
        dueDate: { $gte: today.toDate(), $lt: tomorrow.toDate() },
        status: { $ne: 'completed' },
      });
  
      res.status(200).json({
        success: true,
        stats: {
          totalTasks,
          totalCompletedTasks,
          overdueTasks,
          dueTodayTasks,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch task statistics',
        error: error.message,
      });
    }
  };