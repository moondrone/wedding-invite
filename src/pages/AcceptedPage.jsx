import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AcceptedPage() {
    const { code } = useParams()
    const [guest, setGuest] = useState(null)

    useEffect(() => {
        const fetchGuest = async () => {
            const { data } = await supabase
                .from('wedding_guests')
                .select('*')
                .eq('code', code)
                .single()
            setGuest(data)
        }

        fetchGuest()
    }, [code])

    if (!guest) return <p className="text-center mt-10">Loading...</p>

    function getGreetingPrefix(guest) {
        if (guest.amount && guest.amount > 1) return 'Дорогие';

        switch (guest.gender.toLowerCase()) {
            case 'male':
                return 'Дорогой';
            case 'female':
                return 'Дорогая';
            default:
                return 'Дорогой гость';
        }
    }

    return (
        <div className="min-h-screen bg-white text-center p-6">
            <h1 className="text-3xl font-bold mb-4">🎉 Супер!</h1>
            <p className="text-lg mb-2">{getGreetingPrefix(guest)} {guest.name},</p>
            <p className="mb-4">Мы очень рады, что вы разделите с нами праздник!</p>

            <div className="bg-pink-100 rounded-lg shadow p-4 max-w-xl mx-auto">
                <h2 className="text-xl font-semibold mb-2">📍 Где</h2>
                <a href="https://bacio.ee/" target="_blank">Ресторан Bacio</a>, <a href="https://maps.app.goo.gl/RLUSEJj9b93xxe1v9" target="_blank">Narva mnt 63/4, Tallinn</a>

                <h2 className="text-xl font-semibold mt-4 mb-2">📅 Когда</h2>
                <p>Пятница, 16-го мая, 2025 at 17:30</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">👗 Дресс код</h2>
                <p>Торжественный</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">📝 Что дарить</h2>
                <p>Мы не хотим обременять вас поисками подарка, поэтому будем рады вашему вкладу в наш семейный капитал. ♥</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">📝 Еще</h2>
                <p>Цветы, пожалуй, можно оставить для других случаев - пусть этот день будет наполнен только вашими улыбками и хорошими словами</p>
                <p>Если возможно - позвольте себе этот вечер без самых маленьких гостей. Пусть он станет уютным праздником и для Вас! На нашем празднике, к сожалению, не предусмотрена детская программа. </p>

                <h2 className="text-xl font-semibold mt-4 mb-2">📝 Вопросы?</h2>
                <p>Звоните 5667 0265</p>
            </div>
        </div>
    )
}
