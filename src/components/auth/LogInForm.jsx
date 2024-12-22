import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/operations/authApi';
export default function LogInForm() {

  const navigate =useNavigate()
  const dispatch= useDispatch()
  const [formData, setFormData] = useState({
   
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
     dispatch(login(formData.email,formData.password,navigate))
  };

  return (
    <Box className="flex items-center justify-center min-h-screen w-[700px] bg-gray-100">
      <Box className="p-8 bg-white rounded-lg shadow-md ">
        <Typography variant="h5" className="!mb-6 text-center text-gray-800 ">
          Log In
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          
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
            Log In
          </Button>
          <Button
            
            href="/register"
            variant="contained"
            fullWidth
            className="!bg-white  !text-black py-3 rounded-md transition duration-300"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
}

