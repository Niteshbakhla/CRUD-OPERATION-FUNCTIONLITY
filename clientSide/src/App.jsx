import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import CreateBlog from './Pages/CreateBlog'
import Navbar from './Components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createblog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
