import fetch from 'node-fetch';
import { options, language } from './conection.js'

// showType = tv | movie

const InvalidShowType = {
    success: false,
    status_code: 1,
    status_message: "Invalid Show Type. Only 'movie' and 'tv' are allowed."
};

export async function GenreList(req, res) {
    const showType = req.params.ShowType;

    const url = `https://api.themoviedb.org/3/genre/${showType}/list?language=${language}`;
    
    const result = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return json.genres ? { success: true, genres: json.genres } : InvalidShowType;
        })
        .catch(err => { return err; });
    
    res.status(200).json(result);
}

export function descoverShows(showType, pag){
    let url = `https://api.themoviedb.org/3/discover/${showType}?include_adult=false&language=${language}&page=${pag}&sort_by=popularity.desc`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));
    
    return result;
}

export function getPopularShows(showType, pag){
    let url = `https://api.themoviedb.org/3/${showType}/popular?language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}

export function getTopShows(showType, pag){
    let url = `https://api.themoviedb.org/3/${showType}/top_rated?language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));
        
    return result;
}

export function searchShow(showType, show, pag){
    let url = `https://api.themoviedb.org/3/search/${showType}?query=${show}&include_adult=false&language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}

export function showStreaming(showType, id){
    let url = `https://api.themoviedb.org/3/${showType}/${id}/watch/providers`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json.results.US })
        .catch(err => console.error('error:' + err));

    return result;
}

export function searchAll(pag){
    let url = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}

export function searchPerson(pag){
    let url = `https://api.themoviedb.org/3/search/person?include_adult=false&language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}