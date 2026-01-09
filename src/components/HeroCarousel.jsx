import { useState } from 'react'

const slides = [
    {
        title: 'Passe na prova do Detran com confiança',
        subtitle: 'Encontre instrutores qualificados perto de você',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
    },
    {
        title: 'Aulas práticas sob medida',
        subtitle: 'Escolha horário, local e preço',
        image: 'https://images.unsplash.com/photo-1542362567-b07e54358753'
    },
    {
        title: 'Instrutores avaliados por alunos reais',
        subtitle: 'Transparência e confiança',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2'
    }
]

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0)

    return (
        <section className="relative w-full h-[420px] overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')`,
                }}
            >
                {/* Overlay de Gradiente para melhorar contraste do texto */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
            </div>
            <img
                src={slides[current].image}
                alt=""
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center">
                <div className="max-w-7xl mx-auto px-6 text-white">
                    <h2 className="text-3xl md:text-4xl font-black mb-3">
                        {slides[current].title}
                    </h2>
                    <p className="text-lg text-gray-200">
                        {slides[current].subtitle}
                    </p>
                </div>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}