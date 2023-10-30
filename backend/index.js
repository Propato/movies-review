import express from 'express'
import bodyParser from 'body-parser'
import {
    getGenreList,
    discoverShows,
    getPopularShows,
    getTopShows,
    searchAll,
    showStreaming,
    getShowById
} from './TMDB/shows.js'

// Constants
const app = express();
const PORT = 8080;
// const HOST = '0.0.0.0';

// Configs
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// ROUTES

/*
*/
const routes = {
    getGenreList: "/backend/api/TMDB/:showType/genre/",
    discoverShows: '/backend/api/TMDB/:showType/discover/:pag',
    getPopularShows: '/backend/api/TMDB/:showType/popular/:pag',
    getTopShows: '/backend/api/TMDB/:showType/topRate/:pag',
    searchAll: '/backend/api/TMDB/:showType/search/:show/:pag',
    showStreaming: '/backend/api/TMDB/:showType/streaming/:showId',
    getShowById: '/backend/api/TMDB/:showType/:showId',
}

/*
*/
app.get(routes.getGenreList, getGenreList);
app.get(routes.discoverShows, discoverShows);
app.get(routes.getPopularShows, getPopularShows);
app.get(routes.getTopShows, getTopShows);
app.get(routes.searchAll, searchAll);
app.get(routes.showStreaming, showStreaming);
app.get(routes.getShowById, getShowById);

/*
*/
// app.post('/backend/api/', createTags);
/*
*/
// app.put('/backend/api/', updateTags);
/*
*/
// app.delete('/backend/api/', deleteTags);

app.get('/', (req, res) => {
    res.status(200).json(routes);
})

// Server
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});