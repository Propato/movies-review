import { Router } from 'express';
// import { getShow, getGenreList, discoverShows, getPopularShows, getTopShows, searchShow, getStreamingFromShow } from '../controller/show.controller';
import { discoverShows, getGenreList, getPopularShows, getShowById, getStreamingForShow, getTopShows, searchShow } from '../controllers/show.controller';

const showRoutes = Router();

showRoutes.route('/:showType/find/:showId')
    .get(getShowById);

showRoutes.route('/:showType/genre')
    .get(getGenreList);

showRoutes.route('/:showType/discover/:pag')
    .get(discoverShows);

showRoutes.route('/:showType/popular/:pag')
    .get(getPopularShows);

showRoutes.route('/:showType/topRate/:pag')
    .get(getTopShows);

showRoutes.route('/:showType/search/:showName/:pag')
    .get(searchShow);

showRoutes.route('/:showType/streaming/:showId')
    .get(getStreamingForShow);

export default showRoutes;