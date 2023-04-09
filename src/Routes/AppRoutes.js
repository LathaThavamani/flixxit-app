import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home'
import Dashboad from './../features/Dashboard/Dashboard';
import Signin from './../features/Signin/Signin'
import Signup from './../features/Signup/Signup'
import VideoPlayer from './../features/Dashboard/components/VideoPlayer';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/dashboard' element={<Dashboad />}></Route>
            <Route path="/video" element={<VideoPlayer />} />
        </Routes>
    )
}

export default AppRoutes
