import fetch from 'node-fetch';
import { options, language } from './conection'

// type = tv | movie

export function GenreList(type) {
    url = `https://api.themoviedb.org/3/genre/${type}/list?language=${language}}`;
    
    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json} )
        .catch(err => console.error('error:' + err));
    
    return result;
}

export function descoverShows(type, pag){
    url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&language=${language}&page=${pag}&sort_by=popularity.desc`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));
    
    return result;
}

export function getPopularShows(type, pag){
    url = `https://api.themoviedb.org/3/${type}/popular?language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}

export function getTopShows(type, pag){
    url = `https://api.themoviedb.org/3/${type}/top_rated?language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));
        
    return result;
}

export function searchShow(type, show, pag){
    url = `https://api.themoviedb.org/3/search/${type}?query=${show}&include_adult=false&language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}

export function showStreaming(type, id){
    url = `https://api.themoviedb.org/3/${type}/${id}/watch/providers`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json.results.US })
        .catch(err => console.error('error:' + err));

    return result;
}

export function searchAll(pag){
    url = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}

export function searchPerson(pag){
    url = `https://api.themoviedb.org/3/search/person?include_adult=false&language=${language}&page=${pag}`;

    const result = fetch(url, options)
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error('error:' + err));

    return result;
}