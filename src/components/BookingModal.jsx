import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function BookingModal({ teacher, onClose }) {
    const [slots, setSlots] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        async function loadSlots() {
            setLoading(true)

            const { data, error } = await supabase
                .from('availability')
                .select('*') // Seleciona todas as colunas
                .eq('teacher_id', teacher.id) // Filtra pelo ID do professor
                .eq('is_booked', false) // Apenas horários não reservados
                .order('start_time', { ascending: true }) // Ordena por horário

            if (error) {
                console.error('Erro ao carregar horários:', error)
            } else {
                setSlots(data || [])
            }

            setLoading(false)
        }
        loadSlots()
    }, [teacher.id])

    const handleBook = async (slot) => {
        if (!user) {
            alert('Você precisa estar logado para agendar')
            return
        }

        // Marcar horário como ocupado
        const { error: updateError } = await supabase
            .from('availability')
            .update({ is_booked: true })
            .eq('id', slot.id)

        if (updateError) {
            alert('Erro ao reservar horário')
            return
        }

        // Criar a aula
        const { error: lessonError } = await supabase
            .from('lessons')
            .insert({
                teacher_id: teacher.id,
                student_id: user.id,
                availability_id: slot.id,
                status: 'scheduled'
            })

        if (lessonError) {
            alert('Erro ao criar agendamento')
            return
        }

        alert('Aula agendada com sucesso!')
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Horários de {teacher.profiles.full_name}</h3>
                    <button onClick={onClose} className="text-gray-400 text-2xl">&times;</button>
                </div>

                {loading ? (
                    <p className="text-center py-10">Carregando horários...</p>
                ) : (
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                        {slots.length > 0 ? slots.map(slot => (
                            <button
                                key={slot.id}
                                onClick={() => handleBook(slot.id)}
                                className="border-2 border-blue-100 rounded-xl p-3 text-center hover:border-blue-600 hover:bg-blue-50 transition-all"
                            >
                                <p className="text-xs font-bold text-blue-600 uppercase">
                                    {new Date(slot.start_time).toLocaleDateString('pt-BR', { weekday: 'short' })}
                                </p>
                                <p className="text-lg font-black text-gray-700">
                                    {new Date(slot.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </button>
                        )) : (
                            <p className="col-span-2 text-center text-gray-500">Nenhum horário disponível.</p>
                        )}
                    </div>
                )}

                <p className="text-xs text-gray-400 mt-6 text-center">
                    Ao agendar, o professor receberá uma notificação para confirmar a aula.
                </p>
            </div>
        </div>
    )
}