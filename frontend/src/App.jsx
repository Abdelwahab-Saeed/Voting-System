import { Routes, Route } from 'react-router-dom'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Login } from './pages/Login'

export const App = () => {
  return (
    <>
      <Header />  
      <Routes>
        
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </>
  )
}
