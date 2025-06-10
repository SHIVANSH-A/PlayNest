import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Banner({ currGame }) {
    const navigate = useNavigate();
    const [animateKey, setAnimateKey] = useState(0);

    const handleNext = () => setAnimateKey((prev) => prev + 1);
    const handlePrev = () => setAnimateKey((prev) => prev - 1);

    return (
        <div className="relative transition-all duration-1000 ease-in-out overflow-hidden">
            {/* {Button Handling animation} */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20
             bg-gradient-to-br from-[#1e3c72] to-[#2a5298]
             text-white p-4 rounded-full shadow-lg
             hover:scale-110 hover:shadow-[0_0_20px_rgba(30,60,114,0.8)]
             border-2 border-white/20 backdrop-blur-md
             transition-all duration-300"
            >
                <FaChevronLeft size={24} />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20
             bg-gradient-to-br from-[#1e3c72] to-[#2a5298]
             text-white p-4 rounded-full shadow-lg
             hover:scale-110 hover:shadow-[0_0_20px_rgba(30,60,114,0.8)]
             border-2 border-white/20 backdrop-blur-md
             transition-all duration-300"
            >
                <FaChevronRight size={24} />
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
                        className="md:h-[320px] w-full rounded-lg "
                        alt={currGame.name}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Banner;
