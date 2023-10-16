import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// This function is responsible for fetching posts from the database and returning them as a JSON response.
export const getPosts = (req, res) => {
        //  Retrieve the access token from cookies
        const token = req.cookies.accessToken;
        if(!token) return res.status(401).json("Not logged in!"); // If no token is found.
        // console.log(req.body);

        // Verify the token with the provided secret key:
        jwt.verify(token, "secretkey", (err, userInfo) => {
            if(err) return res.status(403).json("Invalid Token!");

            // SQL query to select posts and include related user information
            // Ensure that the 'userId' in 'posts' matches 'followedUserId' in 'relationships'
            // and the 'followerUserId' matches the provided parameter
            const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
            LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
            ORDER BY p.createdAt DESC`;

            db.query(q, [userInfo.id, userInfo.id], (err, data) => {
                // Check for any errors that may have occurred during the database query
                if (err) {
                    // If there's an error, return a 500 Internal Server Error response along with the error details.
                    return res.status(500).json(err);
                }

                // If the query is successful, return a 200 OK response with the retrieved data.
                return res.status(200).json(data);
            })
        })
}


export const addPost = (req, res) => {
    //  Retrieve the access token from cookies
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!"); // If no token is found.

    // Verify the token with the provided secret key:
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Invalid Token!");

        // Define the SQL query to insert a new post into the database
        const q = "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

        // Define the values to be inserted into the query
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id // The user's ID, obtained from the verified token
        ]

        db.query(q, [values], (err, data) => {
            // Check for any errors that may have occurred during the database query
            if (err) {
                // If there's an error, return a 500 Internal Server Error response along with the error details.
                return res.status(500).json(err);
            }

            // If the query is successful, return a 200 OK response with the retrieved data.
            return res.status(200).json("Post has been created");
        })
    })
}