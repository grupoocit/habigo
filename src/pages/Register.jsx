import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student' // padrão: aluno
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role
        }
      }
    })

    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    // Redireciona baseado no tipo
    if (form.role === 'teacher') {
      navigate('/professor/dashboard')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-black mb-6">Criar conta</h1>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <label className="block text-xs font-semibold text-gray-600 mb-1">Nome completo</label>
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
        <input
          type="email"
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label className="block text-xs font-semibold text-gray-600 mb-1">Senha</label>
        <input
          type="password"
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <label className="block text-xs font-semibold text-gray-600 mb-2">Tipo de conta</label>
        <div className="flex gap-4 mb-6">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="student"
              checked={form.role === 'student'}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="sr-only peer"
            />
            <div className="border-2 border-gray-200 rounded-lg p-4 text-center peer-checked:border-blue-600 peer-checked:bg-blue-50">
              <p className="font-bold">🎓 Aluno</p>
              <p className="text-xs text-gray-600">Buscar instrutores</p>
            </div>
          </label>

          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={form.role === 'teacher'}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="sr-only peer"
            />
            <div className="border-2 border-gray-200 rounded-lg p-4 text-center peer-checked:border-blue-600 peer-checked:bg-blue-50">
              <p className="font-bold">👨‍🏫 Professor</p>
              <p className="text-xs text-gray-600">Dar aulas</p>
            </div>
          </label>
        </div>

        <button
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold"
        >
          {submitting ? 'Criando...' : 'Criar conta'}
        </button>
      </form>
    </div>
  )
}