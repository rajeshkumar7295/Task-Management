import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sidebarLinks } from "../../data/dashboard-links"
import SidebarLink from './SidebarLink';
import { VscSignOut } from "react-icons/vsc"
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authApi';
import ConfirmationModal from '../common/ConfirmationModal';
const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null);
  if (authLoading ) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <>
      <div className='hidden md:block'>
        <div className='flex min-w-[222px] mt-10 flex-col border-r-[1px]  h-[calc(100vh-3.5rem)]  py-10'>
          <div className='flex flex-col'>
            {
              sidebarLinks.map((link, index) => {
                
                return (
                  <SidebarLink key={index} link={link} iconName={link.icon} />
                )
              }
              )
            }
          </div>
          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 " />
          <div className='flex flex-col'>
            <li className='list-none ml-10'>Settings</li>
            <button className="px-8 py-2 text-sm font-medium text-richblack-300"
              onClick={() => setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),

              })}
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidebar
