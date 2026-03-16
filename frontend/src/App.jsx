import { Routes, Route } from 'react-router-dom'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'
import { VotingBoard } from './pages/VotingBoard'
import { PendingApproval } from './pages/PendingApproval'

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <VotingBoard />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
        <Route path="/pending-approval" element={<PendingApproval />} />
      </Routes>
      <Footer />
    </div>
  )
}
