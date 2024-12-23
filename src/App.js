import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import OpenRoute from './components/auth/OpenRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import HomePage from './pages/Home';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import DashboardStats from './components/core/DashboardStats';
import AllTasks from './pages/AllTasks';
function App() {
  return (
    <div className="w-screen min-h-screen">
     <Routes>
      <Route
      path='/'  element={<HomePage/>}
      />
      <Route
        path='/register' element={
          <OpenRoute>
            <SignUp/>
          </OpenRoute>
        }
      />
      <Route
          path="/login" element={
            <OpenRoute>
              <LogIn />
            </OpenRoute>
          }
        />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
       <Route
        path="/dashboard/stats" element={<DashboardStats/>}
       />
       
       <Route
        path="/dashboard/all-tasks"
        element={<AllTasks/>}
       />
        </Route>
     </Routes>
    </div>
  );
}

export default App;
