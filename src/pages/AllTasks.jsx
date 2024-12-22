import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useSelector } from "react-redux";
import { getAllTasks, deleteTask } from "../services/operations/taskApi"; // Adjust this to call your API
import EditTaskModal from "../components/core/EditTaskModal";
const AllTasks = () => {
    const {token}=useSelector((state)=>state.auth);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalTasks, setTotalTasks] = useState(0); 
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks({
        page: page + 1,
        limit: rowsPerPage,
        search,
        token
      });
      setTasks(response.data);
      setTotalTasks(response.totalTasks); 
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };
  const updateTaskInList = (updatedTask) => {
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      )
    );
  };
  useEffect(() => {
    fetchTasks();
  }, [page, rowsPerPage, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId,token);
      toast.success("Task deleted successfully");
      setConfirmationModal(null);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedTask(null);
  };

  return (
    <>

    <Box>
      <Typography variant="h4" gutterBottom>
        All Tasks
      </Typography>

      
      <TextField
        label="Search tasks"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />

      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell className={` ${task.status === "completed"
      ? "!text-blue-600"
      : task.status === "in progress"
      ? "!text-yellow-600"
      : "!text-red-600"}`}>{task.status || "Pending"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditTask(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setConfirmationModal({
                text1: "Are you sure?",
                text2: "You want to delete this task.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => handleDeleteTask(task._id),
                btn2Handler: () => setConfirmationModal(null),

              })}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalTasks} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {
        selectedTask && (
        <EditTaskModal
            open={openEditModal}
            handleClose={handleCloseEditModal}
            taskData={selectedTask}
            updateTaskInList={updateTaskInList}
        />
        )
      }
    </Box>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default AllTasks;
