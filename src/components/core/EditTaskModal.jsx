import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateTask } from "../../services/operations/taskApi"; 
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditTaskModal = ({ open, handleClose, taskData,updateTaskInList }) => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    taskFile: null,
    existingFile:null
  });

  useEffect(() => {
    if (taskData) {
      setFormData({
        title: taskData.title || "",
        description: taskData.description || "",
        dueDate: taskData?.dueDate ? new Date(taskData.dueDate).toISOString().split('T')[0] : "",
        status: taskData.status || "pending",
        taskFile: null, 
        existingFile:taskData.taskFile || null


      });
    }
  }, [taskData, open]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, taskFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
      
      const response = await updateTask(taskData._id, formData, token); 

      if (response.success) {
        toast.success("Task updated successfully!");

        updateTaskInList(response.data);
        handleClose(); 
      } else {
        toast.error(response.message || "Failed to update task.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating the task.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-20"
        sx={{ outline: "none" }}
      >
        <Box className="flex justify-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="h5" className="text-center mb-4">
          Edit Task
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          
          {formData.existingFile && (
            <Typography variant="body2" className="mt-2">
              Current File:{" "}
              <a
                href={formData.existingFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {formData.existingFile.split("/").pop()}
              </a>
            </Typography>
          )}

          <input
            type="file"
            name="taskFile"
            onChange={handleFileChange}
            className="mt-2"
            accept="image/*,application/pdf"
          />
          <div className="mt-4 flex gap-2 justify-end">
            <Button onClick={handleClose} className="mr-2" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
