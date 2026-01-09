import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Verificando permissões...</p>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  if (profile?.role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black text-red-600 mb-4">🚫 Acesso Negado</h1>
        <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
      </div>
    </div>
  )

  return children
}