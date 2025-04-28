import { useState } from 'react'
import './App.css'
import Login from './component/login/Login'
import Registro from './component/registro/Registro'
import { Route,Routes } from 'react-router'
import { BrowserRouter } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/registro' element={<Registro/>}></Route>
    </Routes>
       
    </BrowserRouter>
  )
}

export default App
