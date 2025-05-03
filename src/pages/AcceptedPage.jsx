export default function AcceptedPage({ guest }) {
    return (
        <div className="min-h-screen bg-white text-center p-6">
            <h1 className="text-3xl font-bold mb-4">🎉 Супер!</h1>
            <p className="text-lg mb-2">Дорогие {guest?.name},</p>
            <p className="mb-4">Мы очень рады, что вы разделите с нами приздник</p>

            <div className="bg-pink-100 rounded-lg shadow p-4 max-w-xl mx-auto">
                <h2 className="text-xl font-semibold mb-2">📍 Где</h2>
                <p>Ресторан Bacio, Narva mnt 63/4, Tallinn</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">📅 Когда</h2>
                <p>Пятница, 16-го мая, 2025 at 17:00</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">👗 Дресс код</h2>
                <p>Торжественный</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">📝 Что дарить</h2>
                <p>Мы не хотим обременять вас поисками подарка, поэтому будем рады вашему вкладу в наш семейный капитал. ♥</p>

                <h2 className="text-xl font-semibold mt-4 mb-2">📝 Пожалуйста</h2>
                <p>Подтвердите своё присутствие на торжестве до 5.05.2025</p>
            </div>
        </div>
    )
}
