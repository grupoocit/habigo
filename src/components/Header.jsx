import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'

export default function Header() {
  const { user, profile } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
          <Link to="/professores" className="hover:text-blue-600">Professores</Link>
          <Link to="/" className="hover:text-blue-600">Como funciona</Link>
        </nav>

        {/* Logo central */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-black text-blue-600"
        >
          HabiGo
        </Link>

        {/* Área direita */}
        <div ref={ref} className="relative">
          {!user ? (
            <Link
              to="/perfil"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Entrar
            </Link>
          ) : (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
              >
                {profile?.full_name?.charAt(0) || 'U'}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2">
                  <div className="px-4 py-2 border-b text-sm">
                    <p className="font-bold text-gray-800">
                      {profile?.full_name}
                    </p>
                  </div>

                  <Link to="/perfil" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    👤 Meu perfil
                  </Link>

                  <Link to="/perfil" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    📅 Meus agendamentos
                  </Link>

                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🚪 Sair
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}