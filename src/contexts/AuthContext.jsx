import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // 1️⃣ Gerenciar sessão
    useEffect(() => {
        let mounted = true

        // Sessão inicial
        supabase.auth.getSession().then(({ data, error }) => {
            if (!mounted) return
            if (error) console.error('getSession error:', error)

            setSession(data.session ?? null)
            setUser(data.session?.user ?? null)
            setLoading(false)
        })

        // Listener de mudanças (login/logout/refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession ?? null)
                setUser(newSession?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [])

    // 2️⃣ Buscar perfil quando user mudar
    useEffect(() => {
        async function loadProfile() {
            if (!user) {
                setProfile(null)
                return
            }

            // Tiramos o .single() e usamos .maybeSingle()
            // O .maybeSingle() retorna null se não encontrar nada, em vez de dar erro 406
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle()

            if (error) {
                console.error('Erro ao buscar perfil:', error)
                return
            }

            if (data) {
                setProfile(data);
                window.myProfile = data; // Isso joga o perfil numa variável global temporária
            }
        }

        loadProfile()
    }, [user])

    // 3️⃣ Memoizar o valor (INCLUINDO profile)
    const value = useMemo(
        () => ({ session, user, profile, loading }),
        [session, user, profile, loading]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}