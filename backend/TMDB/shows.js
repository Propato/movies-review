import fetch from 'node-fetch';
import { options, language } from './conection.js'

// showType = tv | movie

/**
 * For now, errors are being handled through the TMDB API.
 */

// Autenticação do token
export async function authentication() {
    const url = 'https://api.themoviedb.org/3/authentication';

    return await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.success;
        })
        .catch(err => { return err });
}

export async function getGenreList(req, res) {
    const { showType } = req.params;

    const url = `https://api.themoviedb.org/3/genre/${showType}/list?language=${language}`;
    
    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const status = json.genres ? 200 : 400;
            res.status(status).json(json);
        })
        .catch(err => res.status(500).json(err));
}

export async function discoverShows(req, res){
    const { showType, pag } = req.params;

    const url = `https://api.themoviedb.org/3/discover/${showType}?include_adult=false&language=${language}&page=${pag}&sort_by=popularity.desc`;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const status = json.page ? 200 : 400;
            res.status(status).json(json);
        })
        .catch(err => res.status(500).json(err));
}

export async function getPopularShows(req, res){
    const { showType, pag } = req.params;

    const url = `https://api.themoviedb.org/3/${showType}/popular?language=${language}&page=${pag}`;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const status = json.page ? 200 : 400;
            res.status(status).json(json);
        })
        .catch(err => res.status(500).json(err));
}

export async function getTopShows(req, res){
    const { showType, pag } = req.params;
    
    const url = `https://api.themoviedb.org/3/${showType}/top_rated?language=${language}&page=${pag}`;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const status = json.page ? 200 : 400;
            res.status(status).json(json);
        })
        .catch(err => res.status(500).json(err));
}

export async function showStreaming(req, res){
    // TEST: showId = 176
    const { showType, showId } = req.params;

    const url = `https://api.themoviedb.org/3/${showType}/${showId}/watch/providers`;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            json.id ?
                res.status(200).json(json.results.BR) :
                res.status(400).json(json);
        })
        .catch(err => res.status(500).json(err));
}

export async function searchAll(req, res){
    // showType = tv | movie | multi | person
    const { showType, show, pag } = req.params;

    const url = `https://api.themoviedb.org/3/search/${showType}?query=${show}&include_adult=false&language=${language}&page=${pag}`;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const status = json.page ? 200 : 400;
            res.status(status).json(json);
        })
        .catch(err => res.status(500).json(err));
}

export async function getShowById(req, res){
    const { showType, showId } = req.params;

    const url = `https://api.themoviedb.org/3/${showType}/${showId}?language=${language}`;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const status = json.id ? 200 : 400;
            res.status(status).json(json);
        })
        .catch(err => res.status(500).json(err));
}