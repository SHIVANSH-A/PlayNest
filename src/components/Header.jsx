import React, { useContext, useState } from 'react';
import logo from './../assets/images/logo.png';
import { CiSearch } from 'react-icons/ci';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [searchText, setSearchText] = useState('');
    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchText)}`);
            setSearchText('');
        }
    };

    return (
        <div className="flex items-center justify-between gap-5 p-4 mb-2 w-full shadow-md bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 animate-fade-in">
            {/* Logo */}
            <img src={logo} width={60} height={60} onClick={() => { navigate('/') }} className="cursor-pointer hover:scale-105 transition" />
            {/* Search */}
            <div className="flex bg-slate-300 dark:bg-slate-600 p-2 px-4 w-full items-center rounded-full">
                <CiSearch onClick={handleSearch} className="cursor-pointer text-xl text-black dark:text-white" />
                <input
                    type="text"
                    placeholder="Search Games"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    className="bg-transparent outline-none ml-3 w-full text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-300"
                />
            </div>
            <div className="mr-1">
                {/* Theme-toggle */}
                {theme === 'dark' ? (
                    <FaRegSun
                        className="bg-yellow-400 text-[41px] text-white p-2 rounded-full cursor-pointer shadow-lg"
                        onClick={() => {
                            setTheme('light');
                            localStorage.setItem('theme', 'light');
                        }}
                    />
                ) : (
                    <FaRegMoon
                        className="bg-slate-800 text-[41px] text-white p-2 rounded-full cursor-pointer shadow-lg"
                        onClick={() => {
                            setTheme('dark');
                            localStorage.setItem('theme', 'dark');
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default Header;