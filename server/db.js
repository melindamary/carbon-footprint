// * create mysql connection object

import mysql from "mysql";

export const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'carbonfootprint_db'
});