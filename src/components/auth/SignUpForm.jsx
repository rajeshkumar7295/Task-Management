import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/operations/authApi';
export default function SignUpForm() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const signupData ={
      ...formData,
      
  }
  dispatch(setSignupData(signupData))

    dispatch(register(formData.username,formData.email,formData.password,navigate))

    setFormData({
      username:"",
      email:"",
      password:""
    })
  };

  return (
    <Box className="flex items-center justify-center min-h-screen w-[700px] bg-gray-100">
      <Box className="p-8 bg-white rounded-lg shadow-md w-[550px]">
        <Typography variant="h4" className="!mb-6 text-center text-gray-800">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            required
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            required
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            required
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            className="bg-gray-50"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-300"
          >
            Sign Up
          </Button>
          <Button
            
            href="/login"
            variant="contained"
            fullWidth
            className="!bg-white  !text-black py-3 rounded-md transition duration-300"
          >
            Log In
          </Button>
        </form>
      </Box>
    </Box>
  );
}

