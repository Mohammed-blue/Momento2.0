import mysql from "mysql";

// Create a MySQL database connection using the 'mysql' library.
export const db = mysql.createConnection({
    host: "localhost",  // Specify the hostname of your MySQL server.
    user: "root",       // Specify the MySQL user.
    password: "password",  // Specify the password for the MySQL user.
    database: "momento"   // Specify the name of the MySQL database you want to connect to.
});