import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeachers()
  }, [])

  async function loadTeachers() {
    setLoading(true)

    const { data } = await supabase
      .from('teachers')
      .select(`
        id,
        bio,
        hourly_rate,
        rating_avg,
        provides_pickup,
        profiles (full_name)
      `)

    setTeachers(data || [])
    setLoading(false)
  }

  async function updateRate(teacherId, newRate) {
    const { error } = await supabase
      .from('teachers')
      .update({ hourly_rate: newRate })
      .eq('id', teacherId)

    if (!error) {
      alert('Valor atualizado')
      loadTeachers()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Gestão de Professores</h2>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="grid gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">{teacher.profiles?.full_name}</p>
                <p className="text-sm text-gray-600">{teacher.bio || 'Sem bio'}</p>
                <p className="text-sm text-gray-500 mt-2">
                  ⭐ {teacher.rating_avg.toFixed(1)} | 
                  {teacher.provides_pickup ? ' 🚗 Busca aluno' : ' ❌ Sem busca'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-green-600">
                  R$ {teacher.hourly_rate}
                </p>
                <button
                  onClick={() => {
                    const newRate = prompt('Novo valor por hora:', teacher.hourly_rate)
                    if (newRate) updateRate(teacher.id, parseFloat(newRate))
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold mt-2"
                >
                  Editar valor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}