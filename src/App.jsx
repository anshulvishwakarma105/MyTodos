import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/uiComponents/Navbar'
import Footer from './components/uiComponents/Footer'
import TodoApp from './pages/TodoApp'
import About from './pages/About'

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoApp />}>
          </Route>
          <Route path="/about" element={<About />}></Route>
        </Routes >
        <Footer />
    </>
  )
}

export default App
