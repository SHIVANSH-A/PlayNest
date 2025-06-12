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
        <div className="pr-5 animate-fade-in w-full">
            <h1 className="text-[30px] font-bold dark:text-white mb-4">Genre</h1>
            {genreList.map((item, index) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setActiveIndex(index);
                        setGenreId(item.id);
                        setGenreName(item.name);
                    }}
                    className={`flex gap-4 items-center mb-3 cursor-pointer p-3 rounded-xl 
                        transition-all duration-300 ease-in-out shadow-md border-l-4
                        ${activeIndex === index
                            ? 'bg-gray-400 dark:bg-gray-600 border-l-blue-500 scale-105'
                            : 'hover:bg-gray-300 dark:hover:bg-gray-500 border-l-transparent hover:scale-[1.02]'}`}
                >
                    <img
                        src={item.image_background}
                        className="w-[45px] h-[40px] rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={item.name}
                    />
                    <h3
                        className={`text-[18px] dark:text-white transition-all
                            ${activeIndex === index ? 'font-bold' : 'font-medium'}`}
                    >
                        {item.name}
                    </h3>
                </div>
            ))}
        </div>
    );
}

export default GetGenreList;
