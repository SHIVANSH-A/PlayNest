import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GlobalAPI from '../Services/GlobalAPI'

function SearchResult() {
    const { query } = useParams()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const q = query.toLowerCase()

        Promise.all([
            GlobalAPI.getGameList.then(r => r.data.results),
            GlobalAPI.getGenreList.then(r => r.data.results)
        ])
            .then(([allGames, genres]) => {
                const matchedFromAll = allGames.filter(g =>
                    g.name.toLowerCase().includes(q)
                )

                const genrePromises = genres.map(g =>
                    GlobalAPI.getGenreGameList(g.id).then(r => r.data.results)
                )

                return Promise.all(genrePromises)
                    .then(genGamesArr => {
                        const matchedFromGenres = genGamesArr.flat().filter(g =>
                            g.name.toLowerCase().includes(q)
                        )
                        const combined = [...matchedFromAll, ...matchedFromGenres]
                        const unique = combined.reduce((acc, cur) => {
                            if (!acc.some(g => g.id === cur.id)) acc.push(cur)
                            return acc
                        }, [])
                        setResults(unique)
                    })
            })
            .finally(() => setLoading(false))
    }, [query])

    return (
        <div className="p-5">
            <h2 className="text-[30px] font-bold dark:text-white mb-5">
                Search Results for: "{query}"
            </h2>

            {loading ? (
                <p className="text-gray-300">Loading...</p>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map(game => (
                        <div
                            key={game.id}
                            className="bg-slate-500 p-3 rounded-lg hover:scale-105 transition-all cursor-pointer"
                            onClick={() => navigate(`/game/${game.id}`, { state: { selectedGame: game, currentGenreGames: results } })}
                        >
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="h-[200px] w-full object-cover rounded-lg"
                            />
                            <h3 className="text-white font-bold text-xl mt-2">{game.name}</h3>
                            <p className="text-gray-300">
                                Rating: ⭐{game.rating} | 🔥 {game.suggestions_count}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-white">No games found matching "{query}".</p>
            )}
        </div>
    )
}

export default SearchResult