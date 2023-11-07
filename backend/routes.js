export const routes = {
    authentication: '/backend/api/TMDB/authentication',
    getGenreList: '/backend/api/TMDB/:showType/genre/',
    discoverShows: '/backend/api/TMDB/:showType/discover/:pag',
    getPopularShows: '/backend/api/TMDB/:showType/popular/:pag',
    getTopShows: '/backend/api/TMDB/:showType/topRate/:pag',
    searchAll: '/backend/api/TMDB/:showType/search/:show/:pag',
    showStreaming: '/backend/api/TMDB/:showType/streaming/:showId',
    getShowById: '/backend/api/TMDB/:showType/:showId',

    login: '/backend/api/db/login'
}