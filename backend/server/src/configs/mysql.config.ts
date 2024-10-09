import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
export const connection = async () => {
    const pool = await createPool({
        port: 3306,
        host: "mysqldb",
        database: "movies-db",
        
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT)
    });
    return pool;
}