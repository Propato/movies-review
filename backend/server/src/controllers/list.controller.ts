import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { List } from "../interfaces/list.interface";
import { connection } from "../configs/mysql.config";
import { HttpResponse } from "../services/response.http";
import { Request, Response } from "express";
import { QUERY } from "../queries/list.query";
import { Code, Status } from "../enums";
import { validateCreate, validateDelete, validateUpdate } from "../services/queries.result";

type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

export const getLists = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL, [Number(req.params.userId)]);

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Lists retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const createList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let list: List = { ...req.body };
    const userId = Number(req.params.userId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE, [userId, ...Object.values(list)]);

        list.listId = validateCreate(result); // validate and return the list Id

        if(list.listId){
            list.userId = userId;
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List created', list ));
        }
        return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    let list: List = { ...req.body };
    const userId = Number(req.params.userId);
    const listId = Number(req.params.listId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [userId, listId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(list), userId, listId]);

            if(validateUpdate(result)){
                list.userId = userId;
                list.listId = listId;
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List updated', list));
            }
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteList = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    const userId = Number(req.params.userId);
    const listId = Number(req.params.listId);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [userId, listId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [userId, listId]);

            if(validateDelete(result))
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'List deleted'));
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'List not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};