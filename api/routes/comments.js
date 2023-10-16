import express from 'express';
import { getComments, addComment } from "../controllers/comment.js";

// Create an instance of an Express.js Router.
const router = express.Router();

// Define a route for handling GET requests. When a GET request is made to this route
// it will invoke the getComments function to retrieve comments.
router.get("/", getComments);
router.post("/", addComment);

export default router;