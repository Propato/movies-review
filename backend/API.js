import fetch from 'node-fetch';

const APItoken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRiZjJiNWUyZTk4N2FiNTY5ZTNkMjUxODlmMWI1NSIsInN1YiI6IjY1MjBiMmVlNzQ1MDdkMDEzOTVkNGMyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zRIMqVQ2niDXAXCb2pY5ki1df8En154msvr8Mhcqx1I";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APItoken}`
    }
};

// Autenticação do token
let url = 'https://api.themoviedb.org/3/authentication';
let conection = await fetch(url, options)
    .then(res => res.json())
    .then(json => { console.log(json); return json.success } )
    .catch(err => console.error('error:' + err));

if(!conection)
    console.log("ERROR");

// Lista de generos de Filmes
url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

// Lista de generos de Séries (TV Shows)
url = 'https://api.themoviedb.org/3/genre/tv/list?language=en';
fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

// Descobrir filmes
url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

// Descobrir séries
url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));