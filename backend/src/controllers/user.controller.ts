import { User } from "../interfaces/user.interface";
import { connection } from "../configs/mysql.config";
import { HttpResponse } from "../services/response.http";
import { Request, Response } from "express";
import { QUERY } from "../queries/user.query";
import { Code, Status } from "../enums/";
import { checkPassword, hashPassword } from "../services/pass.crypto";
import { ResultSet, validateCreate, validateDelete, validateUpdate } from "../services/queries.result";

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
        const result: ResultSet = await pool.query(QUERY.SELECT, [Number(req.params.userId)]);

        if((result[0] as Array<ResultSet>).length > 0)
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User retrieved', result[0]));

        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));

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

        user.id = validateCreate(result_create); // validate and return the user Id

        if(user.id){
            user.passhash = ""; // Dont send the passhash back

            // A better way is make a SELECT and compare the user return with the user send to check if the update was really successful
            return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User created', user ));
        }
        return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result_create));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let user: User = { ...req.body };
    const id = Number(req.params.userId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [id]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE, [...Object.values(user), id]);

            if(validateUpdate(result)){
                // A better way is make a SELECT and compare the user return with the user send to check if the update was really successful
                user.id = id;
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User updated', user));
            }
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));

        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const updateUserPassword = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    let passwords: { old: string, new: string } = { ...req.body };
    const id = Number(req.params.userId);

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [id]);
        
        if((result[0] as Array<ResultSet>).length > 0){

            const valid: boolean = await checkPassword(passwords.old, (result[0] as Array<User>)[0].passhash);

            if(valid){
                passwords.new = await hashPassword(passwords.new);
                const result: ResultSet = await pool.query(QUERY.UPDATE_PASSWORD, [passwords.new, id]);
                
                if(validateUpdate(result))
                    // A better way is make a SELECT and compare the user return with the user send to check if the update was really successful
                    return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User password updated'));

                return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured', result));
            }
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid Password'));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    const id = Number(req.params.userId);
    
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT, [id]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE, [id]);

            if(validateDelete(result))
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User deleted'));
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'An error occured'));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User not found'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};

export const authUser = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    const user: User = { ...req.body };

    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_EMAIL, [user.email]);
        
        if((result[0] as Array<ResultSet>).length > 0){
            const login: boolean = await checkPassword(user.passhash, (result[0] as Array<User>)[0].passhash);

            if(login)
                return res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'User Authenticated', (result[0] as Array<User>)[0]));
            
            return res.status(Code.BAD_REQUEST).send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Invalid Password'));
        }
        return res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Invalid Email'));

    } catch (error: unknown) {
        console.error(error);

        return res.status(Code.INTERNAL_SERVER_ERROR).send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occured'));
    }
};
