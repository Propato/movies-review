import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Review } from "../interfaces/review.interface";
import { connection } from "../configs/mysql.config";
import { HttpResponse } from "../services/response.http";
import { QUERY } from "../queries/review.query";
import { Request, Response } from "express";
import { Code, Status } from "../enums";
import { validateCreate, validateCreateNoId, validateDelete, validateUpdate } from "../services/queries.result";

type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

export const getReviews = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL, [Number(req.params.listId)]);

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Reviews retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const createReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let review: Review = { ...req.body };
    const listId = Number(req.params.listId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE, [listId, ...Object.values(review)]);

        if(validateCreateNoId(result)){
            review.listId = listId;
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Review created', review ));
        }

        return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    let review: Review = { ...req.body };
    const listId = Number(req.params.listId);
    const movieId = String(req.params.movieId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [listId, movieId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(review), listId, movieId]);
            
            if(validateUpdate(result)){
                review.listId = listId;
                review.movieId = movieId;

                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Review updated', review));
            }
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));

        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Review not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    const listId = Number(req.params.listId);
    const movieId = String(req.params.movieId);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [listId, movieId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [listId, movieId]);
            
            if(validateDelete(result))
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Review deleted'));
            
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Review not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};