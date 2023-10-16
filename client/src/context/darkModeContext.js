import { createContext, useEffect, useState } from "react";

// Create a new context using createContext.
export const DarkModeContext = createContext();

// DarkModeContextProvider is a component that provides the dark mode state and toggle function to its children.
export const DarkModeContextProvider = ({ children }) => {
    // Initialize a state variable 'darkMode' using useState.
    // It holds the current state of dark mode.
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    // Define a function 'toggle' that toggles the dark mode state.
    const toggle = () => {
        setDarkMode(!darkMode);
    };

    // Use the useEffect hook to store the 'darkMode' state in local storage.
    useEffect(() => {
        // localStorage is a web storage API to store data in the browser.
        // JSON.stringify() converts the 'darkMode' state to a string and stores it in local storage.
        localStorage.setItem("darkMode", darkMode);

        // The [darkMode] dependency ensures this effect runs whenever 'darkMode' changes.
    }, [darkMode]);

    // Return the DarkModeContext.Provider component.
    return (
        <DarkModeContext.Provider
        // Provide the 'darkMode' state and 'toggle' function to its child components via the 'value' prop.
        value={{ darkMode, toggle }}
        >
        {/* Render the child components that are wrapped by DarkModeContextProvider. */}
        {children}
        </DarkModeContext.Provider>
    );
};
