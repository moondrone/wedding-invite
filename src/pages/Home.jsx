import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-50 text-center p-6">
            <h1 className="text-4xl font-bold mb-4 text-pink-700">You're Invited! 💍</h1>
            <p className="text-lg mb-6 text-gray-700">
                Welcome to our wedding invitation app. If you received a personal link, click it to view your invite.
            </p>
            <Link
                to="/invite/demo"
                className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
            >
                Demo Invitation →
            </Link>
        </div>
    )
}