import fetch from 'node-fetch';
import { options, language } from './conection.js'

// showType = tv | movie

/**
 * For now, errors are being handled through the TMDB API.
 */

export async function getGenreList(req, res) {
    const showType = req.params.showType;

    const url = `https://api.themoviedb.org/3/genre/${showType}/list?language=${language}`;
    
    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.genres ? { success: true, result: json } : json;
        })
        .catch(err => res.status(500).json(err));
        // 500 makes sense in APIs?
    
    res.status(200).json(result);
}

export async function discoverShows(req, res){
    const showType = req.params.showType;
    const pag = req.params.pag;

    const url = `https://api.themoviedb.org/3/discover/${showType}?include_adult=false&language=${language}&page=${pag}&sort_by=popularity.desc`;

    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.page ? { success: true, result: json } : json;
        })
        .catch(err => res.status(500).json(err));
    
    res.status(200).json(result);
}

export async function getPopularShows(req, res){
    const showType = req.params.showType;
    const pag = req.params.pag;

    const url = `https://api.themoviedb.org/3/${showType}/popular?language=${language}&page=${pag}`;

    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.page ? { success: true, result: json } : json;
        })
        .catch(err => res.status(500).json(err));

    res.status(200).json(result);
}

export async function getTopShows(req, res){
    const showType = req.params.showType;
    const pag = req.params.pag;
    
    const url = `https://api.themoviedb.org/3/${showType}/top_rated?language=${language}&page=${pag}`;

    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.page ? { success: true, result: json } : json;
        })
        .catch(err => res.status(500).json(err));
        
    res.status(200).json(result);
}

export async function searchAll(req, res){
    // showType = tv | movie | multi | person
    const { showType, show, pag } = req.params;

    const url = `https://api.themoviedb.org/3/search/${showType}?query=${show}&include_adult=false&language=${language}&page=${pag}`;

    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.page ? { success: true, result: json } : json;
        })
        .catch(err => res.status(500).json(err));

    res.status(200).json(result);
}

export async function showStreaming(req, res){
    // TEST: showId = 176
    const { showType, showId } = req.params;

    const url = `https://api.themoviedb.org/3/${showType}/${showId}/watch/providers`;

    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.id ? { success: true, result: json.results.BR } : json
        })
        .catch(err => res.status(500).json(err));

    res.status(200).json(result);
}