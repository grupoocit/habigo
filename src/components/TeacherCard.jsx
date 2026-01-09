export default function TeacherCard({ teacher, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow p-4">
      <div className="flex items-start gap-4">
        {/* Foto de Perfil */}
        <div className="w-16 h-16 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-xl">
          {teacher.profiles.avatar_url ? (
            <img src={teacher.profiles.avatar_url} alt={teacher.profiles.full_name} className="w-full h-full rounded-full object-cover" />
          ) : (
            teacher.profiles.full_name.charAt(0)
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800 text-lg">{teacher.profiles.full_name}</h3>
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              ⭐ {teacher.rating_avg || 'Novo'}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{teacher.bio}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {teacher.provides_pickup && (
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100">
                🚗 Busca o aluno
              </span>
            )}
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
              💰 R$ {teacher.hourly_rate}/aula
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onSelect}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Ver horários disponíveis
      </button>
    </div>
  )
}