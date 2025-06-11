import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Banner({ currGame, onNext, onPrev }) {
    const navigate = useNavigate();
    const [animateKey, setAnimateKey] = useState(0);

    const handleNext = () => {
        onNext();
        setAnimateKey((prev) => prev + 1);
    };

    const handlePrev = () => {
        onPrev();
        setAnimateKey((prev) => prev - 1);
    };

    return (
        <div className="relative transition-all duration-1000 ease-in-out overflow-hidden">
            {/* Glassmorphism Left Button */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20
             bg-gradient-to-br from-[#1e3c72] to-[#2a5298]
             text-white p-4 rounded-full shadow-lg backdrop-blur-md
             border border-white/20 bg-opacity-30
             hover:scale-110 hover:shadow-[0_0_25px_rgba(30,60,114,0.8)]
             transition-all duration-300"
            >
                <FaChevronLeft size={20} />
            </button>

            {/* Glassmorphism Right Button */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20
             bg-gradient-to-br from-[#1e3c72] to-[#2a5298]
             text-white p-4 rounded-full shadow-lg backdrop-blur-md
             border border-white/20 bg-opacity-30
             hover:scale-110 hover:shadow-[0_0_25px_rgba(30,60,114,0.8)]
             transition-all duration-300"
            >
                <FaChevronRight size={20} />
            </button>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currGame.id}-${animateKey}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="relative"
                >
                    <div className="absolute bottom-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent w-full rounded-lg">
                        <h2 className="text-[24px] text-blue-550 font-bold drop-shadow-lg">{currGame.name}</h2>
                        <button
                            className="px-3 py-1 bg-white text-black font-semibold rounded mt-2 shadow-md hover:scale-105 transition-transform"
                            onClick={() =>
                                navigate(`/game/${currGame.id}`, {
                                    state: { selectedGame: currGame },
                                })
                            }
                        >
                            See Details
                        </button>
                    </div>
                    <img
                        src={currGame.background_image}
                        className="md:h-[320px] w-full rounded-lg"
                        alt={currGame.name}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Carousel dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${currGame.index === index ? 'bg-white' : 'bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;
