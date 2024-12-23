Task Management Application

This README provides step-by-step instructions for running the Task Management Application (both the backend and frontend) locally on your system.

Prerequisites

Ensure you have the following tools installed:

Node.js (v16 or later)

npm (Node Package Manager, bundled with Node.js)

MongoDB (local or cloud instance)

Backend Setup

1. Clone the Repository

# Clone the repository
git clone <repository-url>

# Navigate to the backend directory
cd task_management_backend

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the task_management_backend directory and add the following:

PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret_key>
CLOUDINARY_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

Replace <your_mongo_connection_string>, <your_jwt_secret_key>, and Cloudinary credentials with your actual values.

4. Start the Server

In Development Mode:

npm run dev

In Production Mode:

npm start

The backend server should now be running on http://localhost:5000 (or the port specified in your .env file).

Frontend Setup

1. Navigate to the Frontend Directory

# Navigate to the frontend directory
cd task-management

2. Install Dependencies

npm install

3. Start the Frontend

In Development Mode:

npm start

The frontend application will open automatically in your default browser, or you can access it at http://localhost:3000.
   
   Demo Account
   Email : demo@gmail.com
   password:12345678
   
Running Both Frontend and Backend Simultaneously

You can use the concurrently script provided in the frontend's package.json to run both servers at the same time:

npm run dev

This will start:

The frontend on http://localhost:3000

The backend on http://localhost:4000

Additional Notes

MongoDB:
Ensure MongoDB is running locally or you have provided a valid connection string for a cloud database (e.g., MongoDB Atlas).

Cloudinary:
Cloudinary credentials are required for handling file uploads. If you don’t use Cloudinary, you may need to modify the file upload functionality.

Environment Variables:
Never share your .env file or sensitive keys in a public repository.

With these steps, your Task Management Application should now be fully functional locally!

