import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function GameDetail() {
    const { id } = useParams();
    const location = useLocation();
    const { selectedGame, currentGenreGames } = location.state || {};
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedGame && currentGenreGames) {
            const filtered = currentGenreGames.filter((g) => g.id !== selectedGame.id);
            setRecommendations(filtered);
        }
    }, [selectedGame, currentGenreGames]);

    return (
        <div className="p-5 md:p-10 bg-white dark:bg-[#0d1117] min-h-screen transition-colors duration-300">
            {selectedGame ? (
                <>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {selectedGame.name}
                    </h1>


                    <img
                        src={selectedGame.background_image}
                        className="w-full max-h-[400px] rounded-xl shadow-lg"
                        alt={selectedGame.name}
                    />

                    {/* Game Info */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-gray-800 dark:text-gray-300 text-base md:text-lg">
                        <p className="inline-flex items-center">
                            🎯 <span className="font-semibold ml-1">Rating:</span>&nbsp;{selectedGame.rating} / 5
                        </p>
                        <p className="inline-flex items-center">
                            🗓 <span className="font-semibold ml-1">Released:</span>&nbsp;{selectedGame.released}
                        </p>
                        <p className="inline-flex items-center">
                            💬 <span className="font-semibold ml-1">Reviews:</span>&nbsp;{selectedGame.reviews_count}
                        </p>
                        <p className="inline-flex items-center">
                            🔥 <span className="font-semibold ml-1">Suggestions:</span>&nbsp;{selectedGame.suggestions_count}
                        </p>
                        <p className="inline-flex items-center">
                            🎮 <span className="font-semibold ml-1">Playtime:</span>&nbsp;{selectedGame.playtime} hrs
                        </p>
                        <p className="inline-flex items-center">
                            🧠 <span className="font-semibold ml-1">ESRB:</span>&nbsp;{selectedGame.esrb_rating?.name || 'Not Rated'}
                        </p>
                    </div>


                    {/* Screenshots */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            🎥 In-Game Screenshots
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {selectedGame.short_screenshots?.slice(1, 4).map((ss) => (
                                <img
                                    key={ss.id}
                                    src={ss.image}
                                    alt="screenshot"
                                    className="rounded-lg h-[150px] w-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
                        Similar {selectedGame.genres?.[0]?.name} Games
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {recommendations.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl shadow-lg cursor-pointer
                                           hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
                                onClick={() =>
                                    navigate(`/game/${item.id}`, {
                                        state: { selectedGame: item, currentGenreGames },
                                    })
                                }
                            >
                                <img
                                    src={item.background_image}
                                    alt={item.name}
                                    className="h-[180px] w-full object-cover rounded-lg mb-2"
                                />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {item.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-800 dark:text-gray-300">Loading game details...</p>
            )}
        </div>
    );
}

export default GameDetail;
