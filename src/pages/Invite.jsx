import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { supabase } from '../supabaseClient'

export default function Invite() {
    const { id } = useParams()
    const [guest, setGuest] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        async function fetchGuest() {
            const { data, error } = await supabase
                .from('wedding_guests')
                .select('*')
                .eq('code', id)
                .single()

            if (data) setGuest(data)
        }

        fetchGuest()
    }, [id])

    async function updateStatus(newStatus) {
        setStatus(newStatus)
        await supabase
            .from('guests')
            .update({ status: newStatus })
            .eq('id', id)
    }

    if (!guest) return <p>Loading...</p>

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl mb-4">Hey {guest.name} 💌</h1>
            {status === null ? (
                <TinderCard
                    onSwipe={(dir) => {
                        if (dir === 'right') updateStatus('accepted')
                        else if (dir === 'left') updateStatus('declined')
                    }}
                >
                    <img src="/couple-photo.jpg" className="rounded-xl w-80 h-96 object-cover" />
                </TinderCard>
            ) : status === 'accepted' ? (
                <p>🎉 See you at the wedding!</p>
            ) : (
                <p>😢 We're sorry to hear that. You can refresh if you change your mind.</p>
            )}
        </div>
    )
}
