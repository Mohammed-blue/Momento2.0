import express from "express";
// Create an instance of the Express application
const app = express();

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import cors from "cors";
import cookieParser from "cookie-parser"
import multer from "multer";

// Middleware for handling CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    // Set the "Access-Control-Allow-Origin" header to allow cross-origin requests.
    // In this case, "true" is not a valid value for this header. It should typically be
    // set to a specific origin (domain) or "*" to allow any domain. Replace "true" with
    // the appropriate value based on your CORS policy.
    res.header("Access-Control-Allow-Origin", true);
    next(); // Continue to the next middleware or route handler.
});

// Middleware: Parse JSON data in incoming requests.
// This middleware will allow your Express application to automatically parse JSON data in incoming HTTP requests.
app.use(express.json())


// Enable Cross-Origin Resource Sharing (CORS)
// This middleware allows your Express application to accept requests from different origins (domains).
// It's commonly used to enable requests from web applications running on different servers or domains.
// This is essential for client-side applications (e.g., React) that make API requests to your server.
app.use(cors(
    {
        origin: 'http://localhost:3000', // Specify the allowed origin (domain) for CORS requests.
        credentials: true, // Allow cookies to be sent cross-origin
        // origin: 'http://127.0.0.1:3000',
    }
));


// Parse Cookies
// This middleware is used to parse cookies from incoming HTTP requests.
// It makes the data contained in cookies accessible in your Express routes.
app.use(cookieParser());

// Configure storage for uploaded files using Multer.
const storage = multer.diskStorage({
    // Define the destination where uploaded files will be stored.
    // In this case, they will be stored in the '../client/public/upload' directory.
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    // Define the file name for the stored file.
    filename: function (req, file, cb) {
        // Generate a unique file name using the current timestamp and the original filename.
        cb(null, Date.now() + file.originalname)
    }
})

// Create a Multer instance using the defined storage.
const upload = multer({ storage: storage })


// Middlewares:
// Configure routes for different parts of your application

// Define a route for handling file uploads.
app.post("/api/upload", upload.single("file"), (req, res) => {
    // Handle the uploaded file.
    const file = req.file;
    // Respond with a status code 200 and JSON data containing the uploaded file's filename
    res.status(200).json(file.filename)
})

// For handling authentication-related routes
app.use("/api/auth", authRoutes);
// Use the userRoutes for the "/api/users" endpoint to test out the routes
// For handling user-related routes
app.use("/api/users", userRoutes);
// For handling post-related routes
app.use("/api/posts", postRoutes);
// For handling comment-related routes
app.use("/api/comments", commentRoutes);
// For handling like-related routes
app.use("/api/likes", likeRoutes);



// Start the Express server on port 8800 and listen for incoming requests
app.listen(8800, () => {
    console.log("API working!"); // Print a message to the console when the server starts
});
