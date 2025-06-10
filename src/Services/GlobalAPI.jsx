import axios from "axios";

const axiosCreate = axios.create({
    baseURL: 'https://api.rawg.io/api',
});

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

const getGenreList = axiosCreate.get('/genres?key=' + apiKey);
const getGameList = axiosCreate.get('/games?key=' + apiKey);
const getGenreGameList = (id) =>
    axiosCreate.get(`/games?key=${apiKey}&genres=${id}`);

export default {
    getGenreList,
    getGameList,
    getGenreGameList
};
