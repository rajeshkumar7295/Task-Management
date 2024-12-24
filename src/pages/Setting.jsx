import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, deleteAccount } from "../services/operations/authApi";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { toast } from "react-hot-toast";

const Setting = () => {
    const {token}=useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showModal, setShowModal] = useState(false);

  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("Both fields are required.");
      return;
    }
    dispatch(changePassword(token, passwordData));
    setPasswordData({
        oldPassword:"",
        newPassword:""
    })
  };

  // Handle account deletion (trigger modal)
  const handleDeleteAccount = () => {
    setShowModal(true);
  };

  // Modal Handlers
  const handleConfirmDelete = () => {
    dispatch(deleteAccount(token, navigate));
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="settings-page max-w-[800px] mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="change-password mb-16">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="flex gap-6">
            {/* Old Password */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your old password"
                required
              />
            </div>

            {/* New Password */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your new password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6  bg-blue-500 float-right text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
      <div className="delete-account p-6 mt-28 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-xl font-semibold mb-3 text-red-600">Delete Account</h2>
        <p className="text-sm text-gray-600 mb-4">
          Deleting your account is irreversible. All your data will be permanently removed.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          modalData={{
            text1: "Are you sure?",
            text2: "Deleting your account is permanent and cannot be undone.",
            btn1Text: "Yes, Delete",
            btn2Text: "Cancel",
            btn1Handler: handleConfirmDelete,
            btn2Handler: handleCancelDelete,
          }}
        />
      )}
    </div>
  );
};

export default Setting;
