import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { List } from "../interfaces/list.interface";
import { connection } from "../configs/mysql.config";
import { HttpResponse } from "../services/response.http";
import { Request, Response } from "express";
import { QUERY } from "../queries/list.query";
import { Code, Status } from "../enums";

type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

export const getLists = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL, [req.params.userId]);

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Lists retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const createList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    const list: List = { ...req.body };

    try {
        const pool = await connection();
        const result_create: ResultSet = await pool.query(QUERY.CREATE, [req.params.userId, ...Object.values(list)]);

        const result: ResultSet = await pool.query(QUERY.SELECT_NAME, [req.params.userId, list.listName]);
        
        if((result[0] as Array<ResultSet>).length > 0)
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List created', { "Result_Create": result_create, "Result": (result[0] as List[])[0] }));
        
        return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', { "Result": result_create}));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    const list: List = { ...req.body };
    const { userId, listId } = req.params;

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [userId, listId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(list), userId, listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List updated', { "Result": result }));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    const { userId, listId } = req.params;
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [userId, listId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [userId, listId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List deleted', { "Result": result }));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};