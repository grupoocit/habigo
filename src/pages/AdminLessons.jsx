import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function AdminLessons() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLessons()
  }, [])

  async function loadLessons() {
    setLoading(true)

    const { data } = await supabase
      .from('lessons')
      .select(`
        id,
        status,
        created_at,
        availability (start_time, end_time),
        student:profiles!student_id (full_name),
        teacher:profiles!teacher_id (full_name)
      `)
      .order('created_at', { ascending: false })

    setLessons(data || [])
    setLoading(false)
  }

  async function cancelLesson(lessonId) {
    if (!confirm('Tem certeza que deseja cancelar esta aula?')) return

    const { error } = await supabase
      .from('lessons')
      .update({ status: 'cancelled' })
      .eq('id', lessonId)

    if (!error) {
      alert('Aula cancelada')
      loadLessons()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Gestão de Agendamentos</h2>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : lessons.length === 0 ? (
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Aluno</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Professor</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {lesson.student?.full_name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {lesson.teacher?.full_name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lesson.availability?.start_time 
                      ? new Date(lesson.availability.start_time).toLocaleString('pt-BR')
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lesson.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                      lesson.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {lesson.status === 'scheduled' ? 'Agendado' :
                       lesson.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lesson.status === 'scheduled' && (
                      <button
                        onClick={() => cancelLesson(lesson.id)}
                        className="text-sm text-red-600 hover:text-red-800 font-semibold"
                      >
                        Cancelar
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