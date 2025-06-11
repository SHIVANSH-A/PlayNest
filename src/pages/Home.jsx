import React, { useEffect, useState } from 'react'
import GetGenreList from '../components/GetGenreList'
import GlobalAPI from '../Services/GlobalAPI'
import Banner from '../components/Banner';
import TrendingGames from '../components/TrendingGames';
import GenreGames from '../components/GenreGames';
import Footer from '../components/Footer';

function Home() {
    const [allGamesList, setAllGamesList] = useState();
    const [allGamesListGenre, setAllGamesListGenre] = useState();
    const [genreName, setGenreNameByItem] = useState('Action');
    const [bannerIndex, setBannerIndex] = useState(0);

    useEffect(() => {
        getAllGameList();
        getGenreGamesListByid(4);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (allGamesList && allGamesList.length > 0) {
                setBannerIndex(prev => (prev + 1) % Math.min(4, allGamesList.length));
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [allGamesList]);

    const getAllGameList = () => {
        GlobalAPI.getGameList.then((resp) => {
            setAllGamesList(resp.data.results);
        })
    }

    const getGenreGamesListByid = (id) => {
        GlobalAPI.getGenreGameList(id).then((resp) => {
            console.log("genre " + id);
            setAllGamesListGenre(resp.data.results);
        })
    }

    return (
        <>
            <div className='grid grid-cols-4 px-5'>
                <div className='hidden md:block'>
                    <GetGenreList setGenreId={(setGenreId) => getGenreGamesListByid(setGenreId)}
                        setGenreName={(name) => setGenreNameByItem(name)}
                    />
                </div>
                <div className=' col-span-4 md:col-span-3'>
                    {(allGamesList?.length > 0 && allGamesListGenre?.length) &&
                        <div>
                            <Banner currGame={allGamesList[bannerIndex]} />
                            <TrendingGames gameList={allGamesList} />
                            <GenreGames gameList={allGamesListGenre} genreName={genreName} />
                        </div>
                    }
                </div>
            </div>

            {/* Footer outside the grid to take full width */}
            <Footer />
        </>
    )
}

export default Home
