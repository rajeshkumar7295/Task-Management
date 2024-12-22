import { toast } from "react-hot-toast"
import {apiConnector} from '../apiconnector'
const BASE_URL =process.env.REACT_APP_BASE_URL

export const taskStats=async(token)=>{

    
    try {
        const response=await apiConnector(
            "GET",
            BASE_URL+ "/tasks/stats",
            null,
            {
                Authorization:`Bearer ${token}`
            }
        );
        console.log("response",response);
        return response;
    } catch (error) {
        console.error("Error fetching task stats:", error); 
        toast.error("Failed to fetch task stats."); 
        return null;
    }

    
}

export const createTask=async(taskData,token,navigate)=>{
    const toastId = toast.loading("Creating task...")

    try {
        console.log("taskData",taskData);
        const response=await apiConnector(
            "POST",
            BASE_URL+"/tasks",
            taskData,
            {
                
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
            
        )
        if (!response.data.success) {
            throw new Error(response.data.message ||"Unknown error occurred.")
          }
    toast.success("Task created Successfully")
    navigate("/dashboard/all-tasks")
        return response.data;
    } catch (error) {
        console.log("Error creating task:",error);
        toast.error("Task not created.")
    }
    finally{

        toast.dismiss(toastId)
    }


}

export const getAllTasks=async({page,limit,search,token})=>{
    try {
        const queryParams = new URLSearchParams({
            page,
            limit,
            search
          }).toString(); 
      
          const response = await apiConnector(
            "GET", 
            `${BASE_URL}/tasks?${queryParams}`, 
            null, 
            {
              Authorization: `Bearer ${token}`, 
            }
          );
      
          return response.data;
      
    } catch (error) {
        console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
    }
}

export const deleteTask = async (taskId, token) => {
    const toastId = toast.loading("Creating task...")
    try {
      const response = await apiConnector(
        "DELETE", 
        `${BASE_URL}/tasks/${taskId}`, 
        null, 
        {
          Authorization: `Bearer ${token}`, 
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Task deleted successfully.")
      
      return response.data; 
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
    finally{
        toast.dismiss(toastId)
    }
  };

  export const updateTask = async (taskId, formData, token) => {
    const toastId = toast.loading("Editing task...")

    try {
      const response = await apiConnector(
        "PUT", 
        `${BASE_URL}/tasks/${taskId}`, 
        formData, 
        {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data",
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message ||"Unknown error occurred.")
      }
      toast.success("Task updated successfully.")
      return response.data; 
    } catch (error) {
      console.log("Failed to update task",error); 
      toast.error("Task not updated.")
    }
    finally{

        toast.dismiss(toastId)
    }
  };