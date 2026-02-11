import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvatar from './UserAvatar';
import NotificationPanel from './NotificationPanel';
import SearchInput from './SearchInput';
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice';

const Navbar = () => {
  const { user } = useSelector((state)=> state.auth);
  const search = useSelector((state)=> state.ui.search);
  const { data } = useGetAllTaskQuery({ search: search });
  console.log(data)
  
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
        <div className="flex gap-4">
            <button className="text-2xl text-gray-500 block md:hidden" onClick={()=> dispatch(setOpenSidebar(true))}>
                ≣
            </button>

            <div className="w-64 2xl:w-100 flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
                <SearchInput results={data?.tasks || []} placeholder="Search tasks..."/>
            </div>
            
        </div>

        <div className="flex gap-2 items-center">
            <NotificationPanel/>
            <UserAvatar/>
        </div>
    </div>
  )
}

export default Navbar