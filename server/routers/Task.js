const express=require("express");
// const upload=require("../middlewares/upload")
const {createTask,updateTask,deleteTask,getAllTasks,getTaskStats}=require("../controllers/tasks")
const authMiddleware=require("../middlewares/auth")
const multer=require("multer");
const upload = multer({ dest: "uploads/" });
const router=express.Router();



router.post('/tasks',authMiddleware, upload.single("taskFile") ,createTask);

router.get('/tasks',authMiddleware,getAllTasks)
router.put('/tasks/:id',authMiddleware,upload.single('taskFile'),updateTask)

router.get('/tasks/stats',authMiddleware,getTaskStats)
router.delete('/tasks/:id',authMiddleware,deleteTask)
module.exports = router;