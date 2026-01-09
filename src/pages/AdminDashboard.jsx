import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function AdminDashboard() {
  const { profile } = useAuth()
  const location = useLocation()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalLessons: 0,
    pendingLessons: 0
  })

  useEffect(() => {
    async function loadStats() {
      // Total de usuários
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Total de professores
      const { count: totalTeachers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'teacher')

      // Total de alunos
      const { count: totalStudents } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student')

      // Total de aulas
      const { count: totalLessons } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })

      // Aulas pendentes
      const { count: pendingLessons } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'scheduled')

      setStats({
        totalUsers: totalUsers || 0,
        totalTeachers: totalTeachers || 0,
        totalStudents: totalStudents || 0,
        totalLessons: totalLessons || 0,
        pendingLessons: pendingLessons || 0
      })
    }

    loadStats()
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">🛡️ Painel Admin</h1>
            <p className="text-sm text-gray-400">Bem-vindo, {profile?.full_name}</p>
          </div>
          <Link to="/" className="text-sm hover:text-blue-400">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navegação Admin */}
        <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Link
            to="/admin"
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              isActive('/admin')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/users"
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              isActive('/admin/users')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            👥 Usuários
          </Link>
          <Link
            to="/admin/teachers"
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              isActive('/admin/teachers')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            👨‍🏫 Professores
          </Link>
          <Link
            to="/admin/lessons"
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              isActive('/admin/lessons')
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📅 Agendamentos
          </Link>
        </nav>

        {/* Conteúdo dinâmico */}
        {location.pathname === '/admin' ? (
          <div>
            <h2 className="text-2xl font-black mb-6">Visão Geral</h2>
            
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total de Usuários"
                value={stats.totalUsers}
                icon="👥"
                color="bg-blue-500"
              />
              <StatCard
                title="Professores"
                value={stats.totalTeachers}
                icon="👨‍🏫"
                color="bg-green-500"
              />
              <StatCard
                title="Alunos"
                value={stats.totalStudents}
                icon="🎓"
                color="bg-purple-500"
              />
              <StatCard
                title="Aulas Agendadas"
                value={stats.pendingLessons}
                icon="📅"
                color="bg-orange-500"
              />
            </div>

            {/* Atividade Recente */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg mb-4">Atividade Recente</h3>
              <p className="text-gray-500 text-sm">
                Funcionalidade em desenvolvimento...
              </p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  )
}