import dotenv from 'dotenv';

dotenv.config();

export const language = 'en';

export const options = (url: string) => {
    return {
        method: 'GET',
        url: url,
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + process.env.API_KEY
        }
    };
}
