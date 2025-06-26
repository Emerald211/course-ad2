import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AccessCoursePage from './pages/Course'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/access-course' element={<AccessCoursePage />}></Route>
   </Routes>
  )
}

export default App
