import { db } from '../connect.js';
import jwt from "jsonwebtoken";
import moment from 'moment';

// Define a function named "getComments" that handles a request and response.
export const getComments = (req, res) => {
        // Define a SQL query to retrieve comments for a specific post and related user information.
        const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
        WHERE c.postId= ?
        ORDER BY c.createdAt DESC`;

        // Execute the SQL query using the database connection (db)
        db.query(q, [req.query.postId], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(data);
        })
}


export const addComment = (req, res) => {
    //  Retrieve the access token from cookies
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!"); // If no token is found.
console.log(req.body);

    // Verify the token with the provided secret key:
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Invalid Token!");

        // Define the SQL query to insert a new post into the database
        const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";

        // Define the values to be inserted into the query
        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id, // The user's ID, obtained from the verified token
            req.body.postId
        ]

        db.query(q, [values], (err, data) => {
            // Check for any errors that may have occurred during the database query
            if (err) {
                // If there's an error, return a 500 Internal Server Error response along with the error details.
                console.log(err);
                console.log(data);

                return res.status(500).json(err);
            }

            // If the query is successful, return a 200 OK response with the retrieved data.
            return res.status(200).json("Comment has been created");
        })
    })
}