import TinderCard from 'react-tinder-card'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../supabaseClient'

export default function Invite() {
    const { code } = useParams()
    const [guest, setGuest] = useState(null)
    const [status, setStatus] = useState(null)
    const [swipeDirection, setSwipeDirection] = useState(null)
    const cardRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGuest = async () => {
            const { data, error } = await supabase
                .from('wedding_guests')
                .select('*')
                .eq('code', code)
                .single()
            if (!error) setGuest(data)
        }

        fetchGuest()
    }, [code])

    const handleSwipe = async (direction) => {
        if (!guest) return
        setSwipeDirection(direction)

        setTimeout(async () => {
            if (direction === 'right') {
                await supabase
                    .from('wedding_guests')
                    .update({ status: 'accepted' })
                    .eq('code', code)
                setStatus('accepted')
                navigate(`/accepted/${code}`)

            } else if (direction === 'left') {
                await supabase
                    .from('wedding_guests')
                    .update({ status: 'rejected' })
                    .eq('code', code)
                setStatus('declined')
            }
        }, 300)
    }


    const forceSwipe = (dir) => {
        cardRef.current.swipe(dir)
    }

    if (!guest) return <div className="text-center mt-10">Loading...</div>

    if (status === 'accepted') {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">🎉 Yay, you’re coming!</h1>
                <p className="mt-4">See you on the big day, {guest.name}!</p>
            </div>
        )
    }

    if (status === 'declined') {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">😢 Sorry to hear that</h1>
                <button
                    className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                    onClick={() => forceSwipe('right')}
                >
                    Change your mind? Swipe right!
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-top h-screen p-4 bg-pink-50">
            <h1 className="text-xl mb-4">Дорогие {guest.name} 💌</h1>
            <p className="mt-2 text-gray-600 italic text-sm">
                Когда в мире свайпов и совпадений Tinder сказал "It’s a match", мы ещё не знали, что это — навсегда.
            </p>
            <p className="mt-2 text-gray-600 italic text-sm">
                30 апреля 2025 года  наше онлайн-знакомство превратилось в оффлайн-семью: мы стали мужем и женой.
            </p>
            <p className="mt-2 text-gray-600 italic text-sm">
                Но наш праздник — это не просто день регистрации, это начало новой главы в нашей жизни, и мы хотим разделить этот момент с вами!
            </p>
            <p className="mt-2 text-gray-600 italic text-sm">
                16 мая 2025 года в 17:00 в ресторане Bacio мы будем отмечать наш союз, и будем счастливы видеть вас среди гостей. Этот день — особенный, и мы с нетерпением ждём, чтобы разделить с вами радость и теплоту!
            </p>

            <div className="w-80 h-96 relative">
                <TinderCard
                    ref={cardRef}
                    onSwipe={handleSwipe}
                    preventSwipe={['up', 'down']}
                >
                    <div
                        className={`bg-white rounded-xl shadow-xl p-6 text-center h-full flex flex-col justify-center transition-transform duration-300 ${
                            swipeDirection === 'left' ? '-translate-x-[150%]' : ''
                        } ${swipeDirection === 'right' ? 'translate-x-[150%]' : ''}`}
                    >
                    <div className="bg-white rounded-xl shadow-xl p-6 text-center h-full flex flex-col justify-center">
                        <img
                            src="/couple-photo.jpg"
                            alt="Евгений и Оксана"
                            className="rounded-xl w-80 h-96 object-cover"
                        />
                        <h2 className="text-xl font-semibold">{guest.name}</h2>
                        <p className="text-gray-500 mt-2 block md:hidden">Свайп вправо - придём</p>
                        <p className="text-gray-500 mt-2 block md:hidden">Налево - не придём</p>
                    </div>
                    </div>
                </TinderCard>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-6 p-4 bg-pink-50 border-t border-gray-200 hidden md:block">
                <button
                    onClick={() => forceSwipe('left')}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                    ❌ Придём
                </button>
                <button
                    onClick={() => forceSwipe('right')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    ✅ Нет
                </button>
            </div>
        </div>
    )
}
