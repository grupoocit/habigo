import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setSubmitting(false)

    if (error) {
      setErrorMsg(error.message || 'Falha ao entrar')
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Entrar</h1>
        <p className="text-sm text-gray-600 mb-6">Acesse sua conta do HabiGo</p>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {errorMsg}
          </div>
        )}

        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label className="block text-xs font-semibold text-gray-600 mb-1">Senha</label>
        <input
          className="w-full mb-6 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Não tem conta?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  )
}