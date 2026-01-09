import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import TeacherSearch from './pages/TeacherSearch'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import TeacherDashboard from './pages/TeacherDashboard'

// Admin
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminLessons from './pages/AdminLessons'
import AdminTeachers from './pages/AdminTeachers'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/professores" element={<><Header /><TeacherSearch /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Header />
              <Profile />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/professor/dashboard"
          element={
            <ProtectedRoute>
              <Header />
              <TeacherDashboard />
              <Footer />
            </ProtectedRoute>
          }
        />

        {/* Rotas Admin (sem Header/Footer) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="lessons" element={<AdminLessons />} />
          <Route path="teachers" element={<AdminTeachers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App