import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Routes>
    </>
  )
}

export default App
