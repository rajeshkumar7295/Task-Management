import { toast } from 'react-hot-toast'
import { setLoading, setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice'
import { apiConnector } from '../apiconnector'

const BASE_URL = process.env.REACT_APP_BASE_URL
export function register(
  username,
  email,
  password,

  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", BASE_URL + "/auth/register", {
        username,
        email,
        password,

      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/register")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", BASE_URL + "/auth/login", {
        email,
        password,
      })



      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))

      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function changePassword(token, formData) {
  return async () => {
    const toastId = toast.loading("loading");
    try {
      
      const response = await apiConnector('PUT', BASE_URL + "/auth/changePassword", formData, {
        Authorization: `Bearer ${token}`,
        
      });
      
      if (!response.data.success) {
      throw new Error(response.data.message);
      }
      toast.success("Password Change Successfully");

    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }
}
export function deleteAccount(token, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("loading");
    try {
      const response = await apiConnector("DELETE", BASE_URL+"/auth/deleteAccount", null, {
        Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data",
      });


      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Account Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Account")
    }
    toast.dismiss(toastId);
  }
}