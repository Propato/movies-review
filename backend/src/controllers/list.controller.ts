import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { List, MovieFromList } from "../interfaces/list.interface";
import { connection } from "../configs/mysql.config";
import { HttpResponse } from "../services/response";
import { Request, Response } from "express";
import { QUERY } from "../queries/list.query";
import { Code, Status } from "../enums";

type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

export const getLists = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL);

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Lists retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const createList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let list: List = { ...req.body };
    console.log(list);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE, Object.values(list));
        // Correção/melhoria: esta linha define o paciente pelos parametros de criação, não pelo paciente realmente criado (fazer um SELECT para checar a criação)
        list = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, 'List created', list));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    let list: List = { ...req.body };
    console.log(list);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.listId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(list), req.params.listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List updated', {...list, id: req.params.listId }));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.listId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [req.params.listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List deleted'));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};


export const getMoviesFromList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.listId]);

        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.SELECT_MOVIES, [req.params.listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Movies from List retrieved', result[0]));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const insertInList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let movieFromList: MovieFromList = { ...req.body };
    console.log(movieFromList);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.listId]);

        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.INSERT_MOVIE, [movieFromList.movieId, req.params.listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Movie insert in List', movieFromList));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteFromList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.listId]);

        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE_MOVIE, [req.params.movieId, req.params.listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Movie Delete from List'));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};