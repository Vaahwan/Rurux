import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Navbar from './pages/navbar/Navbar'
import Login from './pages/login/login'
import AuthRequired from './auth/AuthRequired'
import Streams from './pages/streams/Streams'
import Subject from './pages/subject/Subject'
import Marks from './pages/marks/Marks'
import AllStudents from './pages/allStudents/AllStudents'
import StudentProgress from './pages/studentProgress/StudentProgress'
import StudentProfile from './pages/studentProfile/StudentProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route element={<AuthRequired/>} >
        <Route path='/streams' element={<Streams/>} />
        <Route path='/subject' element={<Subject/>} />
        <Route path='/marks' element={<Marks/>} />
        <Route path='allstudents' element={<AllStudents/>} />
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='studentprogress' element={<StudentProgress/>} />
      <Route path='studentprofile' element={<StudentProfile/>} />
    </Routes>
    </>
  )
}

export default App
