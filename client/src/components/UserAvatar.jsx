import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { logout } from "../redux/slices/authSlice";
import { getInitials } from "../utils";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());

      navigate("/log-in");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className=''>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='cursor-pointer w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-primary'>
              <span className='text-white font-semibold'>
                {getInitials(user?.name)}
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-black/5 focus:outline-none'>
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "User Account"}
                </p>
              </div>

              <div className="p-2 space-y-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition
                        ${active ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"}
                      `}
                    >
                      <FaUser className="text-base" />
                      <span>Profile</span>
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition
                        ${active ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"}
                      `}
                    >
                      <FaUserLock className="text-base" />
                      <span>Change Password</span>
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="p-2">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition
                        ${active ? "bg-red-50 text-red-700" : "text-red-600 hover:bg-red-50"}
                      `}
                    >
                      <IoLogOutOutline className="text-lg" />
                      <span>Logout</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddUser open={open} setOpen={setOpen} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </>
  );
};

export default UserAvatar;