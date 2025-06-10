import React from 'react';
import { useNavigate } from 'react-router-dom';

function GenreGames({ gameList, genreName }) {
    const navigate = useNavigate();
    return (
        <div className="animate-fade-in">
            <h2 className="text-[30px] font-bold dark:text-white mt-5 mb-4">{genreName} Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameList.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gradient-to-tr from-gray-700 to-gray-900 p-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
                        onClick={() => navigate(`/game/${item.id}`, { state: { selectedGame: item, currentGenreGames: gameList } })}
                    >
                        <img
                            src={item.background_image}
                            className="w-full h-[200px] rounded-xl object-cover mb-2"
                            alt={item.name}
                        />
                        <h2 className="text-[20px] font-semibold text-white">
                            {item.name}
                            <span className="ml-3 bg-pink-500 text-white text-sm px-2 py-1 rounded-full">{item.metacritic}</span>
                        </h2>
                        <p className="text-gray-300 text-sm mt-1">⭐ {item.rating} 💬 {item.reviews_count} 🔥 {item.suggestions_count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GenreGames;