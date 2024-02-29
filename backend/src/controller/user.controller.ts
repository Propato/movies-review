import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../interface/user.interface";
import { connection } from "../config/mysql.config";
import { HttpResponse } from "../domain/response";
import { Request, Response } from "express";
import { QUERY } from "../query/user.query";
import { Code, Status } from "../enum/";

type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

export const getUsers = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_ALL);

        return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Users retrieved', result[0]));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const getUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId]);

        if((result[0] as Array<ResultSet>).length > 0){
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', result[0]));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const createUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let user: User = { ...req.body };
    console.log(user);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE, Object.values(user));
        // Correção/melhoria: esta linha define o paciente pelos parametros de criação, não pelo paciente realmente criado (fazer um SELECT para checar a criação)
        user = { id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED).send(new HttpResponse(Code.CREATED, Status.CREATED, 'User created', user));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let user: User = { ...req.body };
    console.log(user);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(user), req.params.userId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User updated', {...user, id: req.params.userId }));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [req.params.userId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User deleted'));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};