import TinderCard from 'react-tinder-card'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../supabaseClient'

export default function Invite() {
    const { code } = useParams()
    const [guest, setGuest] = useState(null)
    const [status, setStatus] = useState(null)
    const cardRef = useRef()

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
        if (direction === 'right') {
            await supabase
                .from('wedding_guests')
                .update({ status: 'accepted' })
                .eq('code', code)
            setStatus('accepted')
        } else if (direction === 'left') {
            await supabase
                .from('wedding_guests')
                .update({ status: 'rejected' })
                .eq('code', code)
            setStatus('declined')
        }
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
                    className="mt-4 bg-pink-500 text-white px-4 py-2 rounded"
                    onClick={() => forceSwipe('right')}
                >
                    Change your mind? Swipe right!
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-pink-50">
            <h1 className="text-2xl mb-4">Дорогие {guest.name} 💌</h1>

            <div className="w-80 h-96 relative">
                <TinderCard
                    ref={cardRef}
                    onSwipe={handleSwipe}
                    preventSwipe={['up', 'down']}
                >
                    <div className="bg-white rounded-xl shadow-xl p-6 text-center h-full flex flex-col justify-center">
                        <img
                            src="/couple-photo.jpg"
                            alt="Евгений и Оксана"
                            className="rounded-xl w-80 h-96 object-cover"
                        />
                        <h2 className="text-xl font-semibold">{guest.name}</h2>
                        <p className="text-gray-500 mt-2 block md:hidden">Swipe right to accept, left to decline</p>
                    </div>
                </TinderCard>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-6 p-4 bg-pink-50 border-t border-gray-200 hidden md:block">
                <button
                    onClick={() => forceSwipe('left')}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                    ❌ Decline
                </button>
                <button
                    onClick={() => forceSwipe('right')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    ✅ Accept
                </button>
            </div>
        </div>
    )
}
