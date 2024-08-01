// import { Review } from "../interface/review.interface";
import { HttpResponse } from "../domain/response";
import axios, { AxiosResponse } from 'axios';
import { Request, Response } from "express";
import { Code, Status } from "../enum";
import { language, options } from "../config/moviedb.API.config";

// showType = 'tv' | 'movie'

export const getShowById = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    const { showType, showId } = req.params;
    const option = options(`https://api.themoviedb.org/3/${showType}/${showId}?language=${language}`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Show retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}

export const getGenreList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    const { showType } = req.params;

    const option = options(`https://api.themoviedb.org/3/genre/${showType}/list?language=${language}`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Genres retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}

export const discoverShows = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    const { showType, pag } = req.params;

    const option = options(`https://api.themoviedb.org/3/discover/${showType}?include_adult=false&language=${language}&page=${pag}&sort_by=popularity.desc`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Shows retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}

export const getPopularShows = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    const { showType, pag } = req.params;

    const option = options(`https://api.themoviedb.org/3/${showType}/popular?language=${language}&page=${pag}`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Popular shows retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}

export const getTopShows = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    const { showType, pag } = req.params;
    
    const option = options(`https://api.themoviedb.org/3/${showType}/top_rated?language=${language}&page=${pag}`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Top shows retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}

export const searchShow = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    // showType = tv | movie | multi | person
    const { showType, show, pag } = req.params;

    const option = options(`https://api.themoviedb.org/3/search/${showType}?query=${show}&include_adult=false&language=${language}&page=${pag}`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Shows retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}

export const getStreamingForShow = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    // TEST: showId = 176
    const { showType, showId } = req.params;

    const option = options(`https://api.themoviedb.org/3/${showType}/${showId}/watch/providers`);

    try{
        const result = await axios.request(option).then((resp: AxiosResponse<any, any>) => {
            return resp.data;
        });

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Streamings retrieved', result));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
}