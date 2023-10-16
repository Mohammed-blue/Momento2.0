import axios from "axios";

// Create an Axios instance with custom configuration options.
export const makeRequest = axios.create({
    // Set the base URL for all requests made with this instance.
    // Include credentials (like cookies) with the requests. This is important for maintaining user sessions.
    baseURL:"http://localhost:8800/api/",
    withCredentials: true,
})