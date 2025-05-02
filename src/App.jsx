import { useState } from "react";
import TinderCard from "react-tinder-card";
import { motion } from "framer-motion";

export default function WeddingInvite() {
    const [decision, setDecision] = useState(null);

    const onSwipe = (direction) => {
        if (direction === "right") {
            setDecision("accepted");
        } else if (direction === "left") {
            setDecision("declined");
        }
    };

    const resetDecision = () => setDecision(null);

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-50 p-4">
            {!decision && (
                <TinderCard
                    onSwipe={onSwipe}
                    preventSwipe={["up", "down"]}
                    className="absolute"
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="/couple-photo.jpg"
                            alt="Couple"
                            className="w-full h-96 object-cover"
                        />
                        <div className="p-4 text-center">
                            <h1 className="text-2xl font-bold text-pink-600">
                                Will you celebrate with us?
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">Swipe right to accept ❤️</p>
                            <p className="text-sm text-gray-500">Swipe left to decline 💔</p>
                        </div>
                    </motion.div>
                </TinderCard>
            )}

            {decision === "accepted" && (
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-6 max-w-md text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2 className="text-2xl font-bold text-green-600 mb-2">Yay! 🎉</h2>
                    <p className="mb-4 text-gray-700">We're so happy you'll join us.</p>
                    <p className="mb-2 font-semibold">📍 Venue: Rose Garden, Tallinn</p>
                    <p className="mb-2 font-semibold">📅 Date: July 6th, 2025</p>
                    <p className="mb-4 font-semibold">🕒 Time: 3:00 PM</p>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600">
                        Confirm RSVP
                    </button>
                </motion.div>
            )}

            {decision === "declined" && (
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-6 max-w-md text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Oh no! 💔</h2>
                    <p className="mb-4 text-gray-700">
                        We're sorry to hear that. But if you change your mind...
                    </p>
                    <button
                        onClick={resetDecision}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
                    >
                        Swipe again
                    </button>
                </motion.div>
            )}
        </div>
    );
}
