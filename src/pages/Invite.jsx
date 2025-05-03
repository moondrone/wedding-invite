import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { supabase } from '../supabaseClient'

export default function Invite() {
    const { code } = useParams()
    const [guest, setGuest] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        async function fetchGuest() {
            const { data, error } = await supabase
                .from('wedding_guests')
                .select('*')
                .eq('code', code)
                .single()
            console.log('Supabase data:', data)
            console.log('Supabase error:', error)

            if (data) setGuest(data)
        }

        fetchGuest()
    }, [code])

    async function updateStatus(newStatus) {
        setStatus(newStatus)
        await supabase
            .from('guests')
            .update({ status: newStatus })
            .eq('code', code)
    }

    if (!guest) return <p>Loading...</p>

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl mb-4">Дорогие {guest.name} 💌</h1>
            {status === null ? (
                <TinderCard
                    onSwipe={(dir) => {
                        if (dir === 'right') updateStatus('accepted')
                        else if (dir === 'left') updateStatus('declined')
                    }}
                >
                    <img src="/couple-photo.jpg" className="rounded-xl w-80 h-96 object-cover" />
                    <div className="p-4 text-center">
                        <h1 className="text-2xl font-bold text-pink-600">
                            Will you celebrate with us?
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">Swipe right to accept ❤️</p>
                        <p className="text-sm text-gray-500">Swipe left to decline 💔</p>
                    </div>
                </TinderCard>
            ) : status === 'accepted' ? (
                <p>🎉 See you at the wedding!</p>
            ) : (
                <p>😢 We're sorry to hear that. You can refresh if you change your mind.</p>
            )}
        </div>
    )
}
