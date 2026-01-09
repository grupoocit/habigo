import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import TeacherCard from '../components/TeacherCard'
import Filters from '../components/Filters'
import BookingModal from '../components/BookingModal'

export default function TeacherSearch() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    maxPrice: 200,
    pickupOnly: false
  })
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  useEffect(() => {
    async function loadTeachers() {
      setLoading(true)
      
      let query = supabase
        .from('teachers')
        .select(`
          id, bio, hourly_rate, provides_pickup, rating_avg,
          profiles (full_name, avatar_url)
        `)

      if (filters.maxPrice) {
        query = query.lte('hourly_rate', filters.maxPrice)
      }
      
      if (filters.pickupOnly) {
        query = query.eq('provides_pickup', true)
      }

      const { data, error } = await query

      if (error) console.error(error)
      else setTeachers(data)
      
      setLoading(false)
    }

    loadTeachers()
  }, [filters])

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Encontre seu Instrutor
        </h2>
        <p className="text-gray-600 mb-6">
          Use os filtros abaixo para encontrar o professor ideal para você
        </p>

        <Filters filters={filters} setFilters={setFilters} />

        <h3 className="text-lg font-bold text-gray-700 mb-4">
          {loading ? 'Buscando...' : `${teachers.length} instrutores encontrados`}
        </h3>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {teachers.length > 0 ? (
              teachers.map(teacher => (
                <TeacherCard 
                  key={teacher.id} 
                  teacher={teacher} 
                  onSelect={() => setSelectedTeacher(teacher)} 
                />
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Nenhum instrutor encontrado com esses filtros.</p>
                <button 
                  onClick={() => setFilters({ maxPrice: 200, pickupOnly: false })}
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedTeacher && (
        <BookingModal 
          teacher={selectedTeacher} 
          onClose={() => setSelectedTeacher(null)} 
        />
      )}
    </main>
  )
}