import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, student, teacher, admin

  useEffect(() => {
    loadUsers()
  }, [filter])

  async function loadUsers() {
    setLoading(true)

    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('role', filter)
    }

    const { data } = await query
    setUsers(data || [])
    setLoading(false)
  }

  async function toggleUserRole(userId, currentRole) {
    const newRole = currentRole === 'student' ? 'teacher' : 'student'
    
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)

    if (!error) {
      alert(`Usuário alterado para ${newRole}`)
      loadUsers()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black">Gestão de Usuários</h2>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">Todos</option>
          <option value="student">Alunos</option>
          <option value="teacher">Professores</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Criado em</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{user.full_name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'teacher' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'admin' ? '🛡️ Admin' :
                       user.role === 'teacher' ? '👨‍🏫 Professor' :
                       '🎓 Aluno'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => toggleUserRole(user.id, user.role)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Alterar tipo
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}