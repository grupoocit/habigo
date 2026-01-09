import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { Navigate } from 'react-router-dom'

export default function TeacherDashboard() {
  const { user, profile, loading } = useAuth()
  const [lessons, setLessons] = useState([])
  const [availability, setAvailability] = useState([])
  const [newSlot, setNewSlot] = useState({ date: '', startTime: '', endTime: '' })

  useEffect(() => {
    if (!user) return

    async function loadData() {
      // Buscar aulas do professor
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select(`
          id, status, created_at,
          availability (start_time, end_time),
          student:profiles!student_id (full_name)
        `)
        .eq('teacher_id', user.id)

      setLessons(lessonsData || [])

      // Buscar horários disponíveis
      const { data: slotsData } = await supabase
        .from('availability')
        .select('*')
        .eq('teacher_id', user.id)
        .order('start_time')

      setAvailability(slotsData || [])
    }

    loadData()
  }, [user])

  async function handleAddSlot(e) {
    e.preventDefault()

    const startDateTime = new Date(`${newSlot.date}T${newSlot.startTime}`)
    const endDateTime = new Date(`${newSlot.date}T${newSlot.endTime}`)

    const { error } = await supabase
      .from('availability')
      .insert({
        teacher_id: user.id,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        is_booked: false
      })

    if (!error) {
      alert('Horário adicionado!')
      setNewSlot({ date: '', startTime: '', endTime: '' })
      // Recarregar
      window.location.reload()
    }
  }

  if (loading) return null
  if (!user || profile?.role !== 'teacher') return <Navigate to="/" />

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black mb-8">Dashboard do Professor</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Próximas Aulas */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-4">Próximas Aulas</h2>
          {lessons.length === 0 ? (
            <p className="text-gray-500">Nenhuma aula agendada</p>
          ) : (
            <div className="space-y-3">
              {lessons.map(lesson => (
                <div key={lesson.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{lesson.student?.full_name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(lesson.availability.start_time).toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gerenciar Horários */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-4">Adicionar Horário</h2>
          <form onSubmit={handleAddSlot} className="space-y-3">
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              required
            />
            <input
              type="time"
              placeholder="Início"
              className="w-full px-3 py-2 border rounded-lg"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              required
            />
            <input
              type="time"
              placeholder="Fim"
              className="w-full px-3 py-2 border rounded-lg"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              required
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">
              Adicionar
            </button>
          </form>

          <h3 className="font-bold mt-6 mb-3">Horários Cadastrados</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availability.map(slot => (
              <div key={slot.id} className="text-sm p-2 bg-gray-50 rounded">
                {new Date(slot.start_time).toLocaleString('pt-BR')} - {slot.is_booked ? '🔒 Reservado' : '✅ Livre'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}