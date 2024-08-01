import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../interface/user.interface";
import { connection } from "../config/mysql.config";
import { HttpResponse } from "../domain/response";
import { Request, Response } from "express";
import { QUERY } from "../query/user.query";
import { Code, Status } from "../enum/";
import { checkPassword, hashPassword } from "../services/pass.crypto";

type ResultSet = [ ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

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
    user.passhash = await hashPassword(user.passhash);

    try {
        const pool = await connection();
        const result_create: ResultSet = await pool.query(QUERY.CREATE, Object.values(user));

        const result: ResultSet = await pool.query(QUERY.SELECT_EMAIL, [user.email]);
        
        if((result[0] as Array<ResultSet>).length > 0)
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User created', (result[0] as User[])[0]));
        
        return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', { "Result": result_create}));
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let user: User = { ...req.body };

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            await pool.query(QUERY.UPDATE, [...Object.values(user), req.params.userId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User updated', {...user, id: req.params.userId }));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateUserPassword = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let passwords: { old: string, new: string } = { ...req.body };

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [req.params.userId]);
        
        if((result[0] as Array<ResultSet>).length > 0){

            const valid: boolean = await checkPassword(passwords.old, (result[0] as User[])[0].passhash);

            if(valid){
                passwords.new = await hashPassword(passwords.new);
                await pool.query(QUERY.UPDATE_PASSWORD, [passwords.new, req.params.userId]);
                
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User password updated', { id: req.params.userId }));
            }
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid Password'));

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
            await pool.query(QUERY.DELETE, [req.params.userId]);

            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User deleted'));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const authUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let user: User = { ...req.body };

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_EMAIL, [user.email]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const login: boolean = await checkPassword(user.passhash, (result[0] as User[])[0].passhash);

            if(login)
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User Authenticated', (result[0] as User[])[0]));
            
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid Password'));
        } else {
            return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Invalid Email'));
        }
    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};
