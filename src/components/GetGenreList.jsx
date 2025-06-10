import React, { useEffect, useState } from 'react';
import GlobalAPI from '../Services/GlobalAPI';

function GetGenreList({ setGenreId, setGenreName }) {
    const [genreList, setGenreList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        getGenreList();
    }, []);

    const getGenreList = () => {
        GlobalAPI.getGenreList.then((resp) => {
            setGenreList(resp.data.results);
        });
    };

    return (
        // Nav for Genre
        <div className="pr-5 animate-fade-in">
            <h1 className="text-[30px] font-bold dark:text-white mb-3">Genre</h1>
            {genreList.map((item, index) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setActiveIndex(index);
                        setGenreId(item.id);
                        setGenreName(item.name);
                    }}
                    className={`flex gap-3 items-center mb-2 cursor-pointer p-2 rounded-xl group transition-transform duration-300 ease-in-out
                        ${activeIndex === index ? 'bg-gray-400 dark:bg-gray-600 scale-105' : 'hover:bg-gray-300 dark:hover:bg-gray-500'}`}
                >
                    <img
                        src={item.image_background}
                        className="w-[45px] h-[40px] rounded-lg group-hover:scale-110 transition-transform duration-300"
                        alt={item.name}
                    />
                    <h3 className={`text-[20px] dark:text-white group-hover:font-semibold ${activeIndex === index ? 'font-bold' : ''}`}>{item.name}</h3>
                </div>
            ))}
        </div>
    );
}

export default GetGenreList;