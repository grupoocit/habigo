import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'

export default function Profile() {
  const { user, profile, loading } = useAuth()
  const [lessons, setLessons] = useState([])
  const [loadingLessons, setLoadingLessons] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Buscar agendamentos do aluno
  useEffect(() => {
    async function loadLessons() {
      if (!user) return

      setLoadingLessons(true)

      const { data } = await supabase
        .from('lessons')
        .select(`
          id,
          status,
          created_at,
          availability (
            start_time,
            end_time
          ),
          teacher:teachers (
            profiles (
              full_name
            )
          )
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })

      setLessons(data || [])
      setLoadingLessons(false)
    }

    loadLessons()
  }, [user])

  async function handleLogin(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setSubmitting(false)
    if (error) setError('Email ou senha inválidos')
  }

  if (loading) return null

  /* NÃO LOGADO */
  if (!user) {
    return (
      <main className="max-w-md mx-auto px-6 py-16">
        <h2 className="text-2xl font-black mb-2">Entrar na sua conta</h2>
        <p className="text-gray-600 mb-6">
          Acesse sua conta para ver seu perfil e agendamentos
        </p>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <input
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Senha"
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold"
          >
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-sm text-center text-gray-600">
            Não tem conta?{' '}
            <a href="/register" className="text-blue-600 font-semibold">
              Criar conta
            </a>
          </p>
        </form>
      </main>
    )
  }

  /* LOGADO */
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-black mb-6">Meu Perfil</h2>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <p className="mb-2"><strong>Nome:</strong> {profile?.full_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold text-lg mb-4">Meus Agendamentos</h3>

        {loadingLessons ? (
          <p className="text-gray-500">Carregando...</p>
        ) : lessons.length === 0 ? (
          <p className="text-gray-500">Você ainda não tem agendamentos.</p>
        ) : (
          <div className="space-y-3">
            {lessons.map(lesson => (
              <div key={lesson.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">
                    {lesson.teacher?.profiles?.full_name || 'Professor'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(lesson.availability.start_time).toLocaleString('pt-BR')}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  lesson.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                  lesson.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {lesson.status === 'scheduled' ? 'Agendado' :
                   lesson.status === 'completed' ? 'Concluído' : 'Cancelado'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}