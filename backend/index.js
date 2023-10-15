import express from 'express'
import bodyParser from 'body-parser'
import { GenreList } from './TMDB/shows.js'

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
app.get('/backend/api/TMDB/:ShowType/genre/', GenreList);

/*
*/
// app.post('/backend/api/', createTags);
/*
*/
// app.put('/backend/api/', updateTags);
/*
*/
// app.delete('/backend/api/', deleteTags);

// Server
app.listen(PORT, () => {
    console.log(`Running on http:/localhost:${PORT}`);
});