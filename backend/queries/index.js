import mysql from 'mysql2';

const mysqlConfig = {
    host: 'mysql',
    user: 'propato',
    password: 'senha',
    database: 'db'
};

// Server

let con = null;
var con2 = null;

// export async function connect() {
//     con = await mysql.createConnection(mysqlConfig);
//     await con.connect((err) => {
//         if(err) {
//             console.log('eee');
//             return err;
//         }
//         return true;
//     });
// }

export async function connect() {
    try {
        con = await mysql.createConnection(mysqlConfig);
        console.log('Connected to MySQL database.');
        return true;
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        return false;
    }
}

export async function connect2() {
    con2 = mysql.createConnection(mysqlConfig);
    return await con2.connect((err) => {
        if(err) return err;
        return true;
    });
}

export async function run(req, res) {
    con.query("SELECT * FROM `Users`", (err, result) => {
        if (err) throw err;
        res.send("Result: " + result);
    });
}
export async function run2(req, res) {
    con2.query("SELECT * FROM `Users`", (err, result) => {
        if (err) throw err;
        res.send("Result: " + result);
    });
}
