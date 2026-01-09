export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
      <h3 className="text-sm font-bold text-gray-700 mb-3">Filtrar por:</h3>
      
      <div className="flex flex-col gap-4">
        {/* Filtro de Preço Máximo */}
        <div>
          <label className="text-xs text-gray-500">Preço máximo por aula: R$ {filters.maxPrice || '200'}</label>
          <input 
            type="range" 
            min="40" 
            max="200" 
            step="10"
            value={filters.maxPrice || 200}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Toggle Busca em Casa */}
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">Busca o aluno em casa?</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.pickupOnly || false}
              onChange={(e) => setFilters({...filters, pickupOnly: e.target.checked})}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
        </label>
      </div>
    </div>
  )
}