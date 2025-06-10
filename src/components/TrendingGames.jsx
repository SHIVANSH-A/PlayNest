import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrendingGames({ gameList }) {
    const navigate = useNavigate();
    return (
        <div className="mt-5">
            <h1 className="font-bold text-[30px] dark:text-white mb-4 animate-fade-in">Trending Games</h1>
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 pt-4 gap-6">
            {/* FourTrending Games */}
                {gameList.map((item, index) => 
                    index < 4 ? (
                        <div
                            key={item.id}
                            className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl group hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out cursor-pointer overflow-hidden"
                            onClick={() => navigate(`/game/${item.id}`, { state: { selectedGame: item, currentGenreGames: gameList } })}
                        >
                            <img
                                src={item.background_image}
                                className="h-[250px] w-full rounded-t-xl object-cover group-hover:opacity-90 transition-all"
                                alt={item.name}
                            />
                            <h2 className="dark:text-white text-white text-[20px] font-semibold p-2 text-center animate-slide-up-fade">
                                {item.name}
                            </h2>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}

export default TrendingGames;