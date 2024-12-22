import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CircularProgress ,Button} from "@mui/material";
import { taskStats } from "../../services/operations/taskApi"
import { toast } from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import { useSelector } from "react-redux";
const DashboardStats=()=>{
    const {token}=useSelector((state)=>state.auth);
    const [stats, setStats] = useState({
        totalTasks: 0,
        totalCompletedTasks: 0,
        overdueTasks: 0,
        dueTodayTasks: 0,
      });
      const [loading, setLoading] = useState(true);
      const [openModal, setOpenModal] = useState(false);

      const handleOpen = () => setOpenModal(true);
      const handleClose = () => setOpenModal(false);
      useEffect(() => {
        const fetchTaskStats = async () => {
          try {
            
            const response = await taskStats(token);
            if (response && response.data.success) {
              setStats(response.data.stats);
            } else {
              toast.error("Failed to fetch stats!");
            }
          } catch (error) {
            console.error("Error fetching stats:", error);
            toast.error("Error loading dashboard data.");
          } finally{
            setLoading(false);
          }
        };
    
        fetchTaskStats();
      }, []);

      return (
        <div style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <div className="p-6">
      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Task
        </Button>
      </div>
      <CreateTaskModal open={openModal} handleClose={handleClose} />
    </div>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: "primary.main", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5">Total Tasks</Typography>
                    <Typography variant="h4">{stats.totalTasks}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: "success.main", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5">Completed Tasks</Typography>
                    <Typography variant="h4">{stats.totalCompletedTasks}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: "error.main", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5">Overdue Tasks</Typography>
                    <Typography variant="h4">{stats.overdueTasks}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: "warning.main", color: "white" }}>
                  <CardContent>
                    <Typography variant="h5">Due Today</Typography>
                    <Typography variant="h4">{stats.dueTodayTasks}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </div>
      );
    
}
export default DashboardStats;