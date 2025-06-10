import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SearchResult from './pages/SearchResult';
import GameDetail from './pages/GameDetail';
import { ThemeContext } from './contexts/ThemeContext';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme} ${theme === 'dark' ? 'bg-black' : ''} min-h-[100vh]`}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/game/:id" element={<GameDetail />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;