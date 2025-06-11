import React, { useContext, useState } from 'react';
import logo from './../assets/images/logo1.gif';
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
        <div
            className="flex items-center justify-between gap-5 p-4 mb-2 w-full
  bg-gradient-to-r from-slate-900 via-slate-800 to-slate-500
  dark:from-slate-900 dark:via-slate-800 dark:to-slate-600
  animate-fade-in relative z-10"
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            }}
        >

            {/* Logo */}
            <img src={logo} width={140} height={60} onClick={() => { navigate('/') }} className="cursor-pointer hover:scale-105 transition" />
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