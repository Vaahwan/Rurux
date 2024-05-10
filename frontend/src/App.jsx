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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route element={<AuthRequired/>} >
        <Route path='/streams' element={<Streams/>} />
        <Route path='subject' element={<Subject/>} />
      </Route>
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
