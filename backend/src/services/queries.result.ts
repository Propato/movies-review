import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export type ResultSet = [ ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];

// It is necessary to implement transactions so that, if the results are invalidated, what was done is undone.

export const validateCreate = (result: ResultSet) => {

    let res = result as Array<ResultSetHeader>;
    
    if(res[0].affectedRows === 1 && res[0].insertId !== 0 && res[0].warningStatus === 0 && res[0].info === "" && (res[1] === null || res[1] === undefined))
        return res[0].insertId as number;
    return 0;
}

export const validateUpdate = (result: ResultSet) => {

    let res = result as Array<ResultSetHeader>;
    const info = "Rows matched: 1  Changed: 1  Warnings: 0";
    
    if(res[0].affectedRows === 1 && res[0].insertId === 0 && res[0].warningStatus === 0 && res[0].info === info && (res[1] === null || res[1] === undefined))
        return true;
    return false;
}

export const validateDelete = (result: ResultSet) => {

    let res = result as Array<ResultSetHeader>;
    
    if(res[0].affectedRows === 1 && res[0].insertId === 0 && res[0].warningStatus === 0 && res[0].info === "" && (res[1] === null || res[1] === undefined))
        return true;
    return false;
}