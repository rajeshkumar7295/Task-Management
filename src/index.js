import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {Toaster} from "react-hot-toast"
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: rootReducer
})

root.render(
  
    <Provider store={store}>

    <BrowserRouter>
      <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
    
  
);

