import './App.css'
import { Routes, Route, Navigate, Outlet, useLocation, replace } from 'react-router-dom'
import { Toaster } from 'sonner'
import Sidebar from './components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { setOpenSidebar } from './redux/slices/authSlice'
import { Fragment } from 'react'
import clsx from 'clsx'
import { useRef } from 'react'
import { Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import {
  Dashboard,
  Login,
  TaskDetail,
  Tasks,
  Trash,
  Users,
  StatusPage,
} from "./pages";

function Layout(){
  const {user} = useSelector((state)=> state.auth)
  const location = useLocation()

  return user ? (<div className='w-full h-screen flex flex-col md:flex-row'>
    <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
      <Sidebar/>
    </div>
    <MobileSidebar/>

    <div className="flex-1 overflow-y-auto">
      <Navbar/>
      <div className="p-4 2xl:px-10">
        <Outlet/>
      </div>
    </div>
  </div>) : (<Navigate to="/login" state={{from: location}} replace />)
}

const MobileSidebar = () =>{
  const{isSidebarOpen} = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () =>{
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
          show={isSidebarOpen}
          as={Fragment}
          enter="transition-opacity duration-700"
          enterFrom="opacity-x-10"
          enterTo="opacity-x-100"
          leave="transition-opacity duration-700"
          leaveFrom="opacity-x-100"
          leaveTo="opacity-x-0"
      >
      {(ref)=> <div ref={(node)=> (mobileMenuRef.current = node)} className={clsx('md:hidden w-full h-full bg-black/40 transition all duration-700 transform', isSidebarOpen ? "translate-x-0" : "translate-x-full")} onClick={()=> closeSidebar()}>
        <div className="bg-white w-3/4 h-full">
          <div className="w-full flex justify-end px-5 pt-5">
            <button onClick={()=> closeSidebar()} className='flex justify-end items-end'><IoClose size={25}/></button>
          </div>

          <div className="-mt-10"><Sidebar/></div>
        </div>
        </div>}
      </Transition>
    </>
  )
}


const App = () => {
  const theme = "light"

  return (
    <main className={theme}>
      <div className='w-full min-h-screen bg-[#f3f4f6]'>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Navigate to='/dashboard' />}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/tasks' element={<Tasks/>}/>
            <Route path='/completed/:status' element={<Tasks/>}/>
            <Route path='/in-progress/:status' element={<Tasks/>}/>
            <Route path='/todo/:status' element={<Tasks/>}/>
            <Route path='/team' element={<Users/>}/>
            <Route path='/trash' element={<Trash/>}/>
            <Route path='/task/:id' element={<TaskDetail/>}/>
            <Route path='/status' element={<StatusPage/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>

      <Toaster richColors position="top-center"/>
    </main>
  )
}

export default App
