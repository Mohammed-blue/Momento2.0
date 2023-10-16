import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// This function is used to handle user registration.
export const register = (req, res) => {
    // CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE username = ?"

    // Query the database to check if a user with the provided username already exists.
    db.query(q, [req.body.username], (err, data) => {
        if(err) {
            return res.status(500).json(err); // Internal server error if there's a database query error.
        }
        if(data.length) {
             // If data.length is greater than 0, it means a user with this username already exists.
            return res.status(409).json("User already exists!");
        }

        // CREATE A NEW USER
            // Hash the password before storing it in the database for security.
            const salt = bcrypt.genSaltSync(10); // Generate a salt for password hashing.
            const hashedPassword = bcrypt.hashSync(req.body.password, salt); // Hash the user's password.

            const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?)"

            const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

            // Insert the new user's data into the database.
            db.query(q, [values], (err, data) => {
                if(err) return res.status(500).json(err);  // Internal server error if there's a database query error.
                return res.status(200).json("User has been created."); // User registration successful.
            })
    })
}




// Define the login function that handles user login
export const login =  (req, res) => {
    // SQL query to select a user from the database by their username
    const q = "SELECT * FROM users WHERE username = ?";

    // Execute the SQL query with the provided username
    db.query(q, [req.body.username], async (err, data) => {
        // Handle any errors that occur during the database query
        if (err) return res.status(500).json(err); // Return a 500 Internal Server Error

        // Check if no user with the provided username was found
        if (data.length === 0) {
            return res.status(404).json("User not found!"); // Return a 404 Not Found status
        }

        // Compare the provided password with the stored hashed password
        const checkPassword = await bcrypt.compare(req.body.password, data[0].password);

        // If the passwords don't match, return an error response
        if (!checkPassword) {
            return res.status(400).json("Wrong password or username!"); // Return a 400 Bad Request status
        }

        // Assuming the login is successful, create a JSON web token (JWT) with the user's ID
        const token = jwt.sign({ id: data[0].id }, "secretkey");

        // Extract the user's data from the database response, excluding the password
        const { password, ...others } = data[0];

        // Set the JWT as a cookie named "accessToken" with httpOnly for security
        // Send a successful response with a 200 OK status and the user's data (excluding password)
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

export const logout = (req, res) => {
    // Clear the "accessToken" cookie in the response.
    res.clearCookie("accessToken", {
        secure: true,    // Set the 'secure' attribute to true for secure (HTTPS) connections.
        sameSite: "none" // Set the 'sameSite' attribute to "none" for cross-site cookies.
    })
    // Set the HTTP status code to 200 (OK) to indicate a successful response.
    .status(200)
    // Respond with a JSON message indicating that the user has been logged out.
    .json("User has been logged out!");
}
