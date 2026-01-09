export default function Home() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
      {/* Seção de Boas-vindas */}
      <section className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
          Conquiste sua CNH com confiança
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Conectamos você aos melhores instrutores de direção da sua região. 
          Agende aulas práticas, escolha horários flexíveis e passe na prova do Detran.
        </p>
      </section>

      {/* Cards de Benefícios */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold text-gray-800 mb-2">Instrutores Qualificados</h3>
          <p className="text-sm text-gray-600">
            Todos os professores são avaliados por alunos reais
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="font-bold text-gray-800 mb-2">Horários Flexíveis</h3>
          <p className="text-sm text-gray-600">
            Agende de acordo com sua disponibilidade
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-bold text-gray-800 mb-2">Preços Transparentes</h3>
          <p className="text-sm text-gray-600">
            Compare valores e escolha o melhor custo-benefício
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white rounded-2xl p-10 text-center">
        <h3 className="text-2xl font-bold mb-3">Pronto para começar?</h3>
        <p className="mb-6 text-blue-100">
          Encontre o instrutor ideal e agende sua primeira aula hoje mesmo
        </p>
        <a 
          href="/professores" 
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
        >
          Buscar Instrutores
        </a>
      </section>
    </main>
  )
}