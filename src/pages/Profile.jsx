import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Dados mockados (depois você vai buscar do Supabase)
  const [userData, setUserData] = useState({
    fullName: 'Lucas Occhiutto',
    email: 'lucas@habigo.com',
    phone: '(11) 99999-9999',
    avatarUrl: null
  })

  return (
    <main className="flex-1 max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card de Foto de Perfil */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4">
            {userData.avatarUrl ? (
              <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              userData.fullName.charAt(0)
            )}
          </div>
          <button className="text-sm text-blue-600 font-semibold hover:underline">
            Alterar foto
          </button>
        </div>

        {/* Card de Dados Pessoais */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Dados Pessoais</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-medium">Nome Completo</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={userData.fullName}
                  onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData.fullName}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500 font-medium">Email</label>
              <p className="text-gray-800 font-medium">{userData.email}</p>
            </div>

            <div>
              <label className="text-xs text-gray-500 font-medium">Telefone</label>
              {isEditing ? (
                <input 
                  type="tel" 
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData.phone}</p>
              )}
            </div>

            {isEditing && (
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Salvar Alterações
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Seção de Agendamentos */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Meus Agendamentos</h3>
        
        <div className="space-y-3">
          {/* Exemplo de agendamento (depois virá do banco) */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">João da Autoescola</p>
              <p className="text-sm text-gray-600">Quinta, 10/01 às 14:00</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Confirmado
            </span>
          </div>

          <div className="text-center py-6 text-gray-400 text-sm">
            Você não tem outros agendamentos no momento
          </div>
        </div>
      </div>
    </main>
  )
}