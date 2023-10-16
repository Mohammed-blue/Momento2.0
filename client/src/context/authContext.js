import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create an authentication context using createContext.
export const AuthContext = createContext();

// Define a component that will provide authentication-related data and functions.
export const AuthContextProvider = ({ children }) => {
    // Create a state variable 'currentUser' to hold information about the logged-in user.
    const [currentUser, setCurrentUser] = useState(
        // Initialize 'currentUser' by checking if user data exists in 'localStorage'.
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Placeholder login function (you'd replace this with real authentication logic).
    const login = async (inputs) => {
        // TO DO: Implement user authentication here.
        // For now, we're setting 'currentUser' to a sample user object.
        // setCurrentUser({
        // id: 1,
        // name: "John Wick",
        // profilePic:
        //     "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
        // });

    // Making a POST request to the authentication endpoint
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true, // Sending credentials with the request, like cookies.
    });

    // Setting the 'currentUser' state with the response data
    setCurrentUser(res.data)
    };


    // useEffect to save 'currentUser' to 'localStorage' when it changes.
    useEffect(() => {
        // Save 'currentUser' as a JSON string in 'localStorage'.
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    // Return the AuthContext.Provider component, which wraps the entire app.
    return (
        // This is a special component provided by React's context system.
        // It allows you to share data and functions with nested components.
        <AuthContext.Provider value={{ currentUser, login }}>
            {/*
                This special React variable represents any child components
                that are wrapped by <AuthContext.Provider>.
                In other words, it represents the components inside the
                <AuthContextProvider> component in your component tree.
            */}
            {children}
        </AuthContext.Provider>
    );
};
