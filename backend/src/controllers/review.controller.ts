import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Review } from "../interfaces/review.interface";
import { connection } from "../configs/mysql.config";
import { HttpResponse } from "../services/response.http";
import { QUERY } from "../queries/review.query";
import { Request, Response } from "express";
import { Code, Status } from "../enums";

type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

export const getReviews = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL, [req.params.userId]);

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Reviews retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const getReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId, req.params.movieId]);

        if((result[0] as Array<ResultSet>).length > 0){
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Review retrieved', result[0]));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Review not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const createReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let review: Review = { ...req.body };
    console.log(review);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE, Object.values(review));
        // Correção/melhoria: esta linha define o paciente pelos parametros de criação, não pelo paciente realmente criado (fazer um SELECT para checar a criação)
        return res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, 'Review created', review));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    let review: Review = { ...req.body };
    console.log(review);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId, req.params.movieId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(review), req.params.userId, req.params.movieId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Review updated', review));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Review not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteReview = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId, req.params.movieId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [req.params.userId, req.params.movieId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Review deleted'));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Review not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};