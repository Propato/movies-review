import mysql from 'mysql2';

const mysqlConfig = {
    host: 'mysql_server',
    user: 'propato',
    password: 'senha',
    database: 'db'
};

// Server

export async function connect(req, res) {
    con = mysql.createConnection(mysqlConfig);
    con.connect((err) => {
        if(err) throw err;
        res.send('connected');
    });
}