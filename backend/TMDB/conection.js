const APItoken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRiZjJiNWUyZTk4N2FiNTY5ZTNkMjUxODlmMWI1NSIsInN1YiI6IjY1MjBiMmVlNzQ1MDdkMDEzOTVkNGMyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zRIMqVQ2niDXAXCb2pY5ki1df8En154msvr8Mhcqx1I";

export const language = 'en';

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APItoken}`
    }
};