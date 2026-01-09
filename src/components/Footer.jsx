export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
        
        <div>
          <h3 className="text-white font-bold text-lg mb-2">HabiGo</h3>
          <p>
            Plataforma de conexão entre alunos e instrutores
            para aprovação na CNH.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Institucional</h4>
          <ul className="space-y-1">
            <li>Sobre nós</li>
            <li>Termos de uso</li>
            <li>Política de privacidade</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Créditos</h4>
          <p>Criado por: <strong>HabiGo Tecnologia</strong></p>
          <p>Ano: {new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-4">
        © {new Date().getFullYear()} HabiGo. Todos os direitos reservados.
      </div>
    </footer>
  )
}