import express from 'express';
import { getUser } from '../controllers/user.js'

// Create an instance of the Express router
const router = express.Router();

// Define a GET route for "/test"
/* router.get("/test", getUser); used for testing out the GET res*/
router.get("/find/:userId", getUser)


export default router;
