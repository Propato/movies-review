import express from 'express'
import bodyParser from 'body-parser'
import { routes } from './routes.js'

import {
    authentication,
    getGenreList,
    discoverShows,
    getPopularShows,
    getTopShows,
    searchAll,
    showStreaming,
    getShowById
} from './TMDB/shows.js'

import {
    connect,
    connect2,
    run,
    run2
} from "./queries/index.js"

// https://www.youtube.com/watch?v=9-iLqe-E9iI

// Constants
const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

// Configs
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// ROUTES
// app.get(routes.authentication, authentication);
app.get(routes.getGenreList, getGenreList);
app.get(routes.discoverShows, discoverShows);
app.get(routes.getPopularShows, getPopularShows);
app.get(routes.getTopShows, getTopShows);
app.get(routes.searchAll, searchAll);
app.get(routes.showStreaming, showStreaming);
app.get(routes.getShowById, getShowById);

// app.get(routes.teste1, getShowById);
// app.get(routes.teste2, getShowById);

// app.get(routes.login, connect);

app.get('/routes', (req, res) => {
    res.status(200).json(routes);
})

// Autentication and init Server
// const auth = await authentication();
// const connected = await connect();
// // const connected2 = await connect2();
// if(auth === true && connected === true){
//     console.log('Authentication and Connection Success.');
    app.listen(PORT, HOST, () => {
        console.log(`Running on http://localhost:${PORT}`);
    });
// } else {
//     console.log(auth)
//     console.log(connected)
//     // console.log(connected2)
//     console.log('Authentication  Failed.');
// }
