import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from 'react-query'

// Define the main functional component "App"
function App() {
  // Use the useContext hook to access the currentUser and darkMode variables from AuthContext and DarkModeContext
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  // Create a QueryClient instance for managing data queries.
  const queryClient = new QueryClient()

  // Define a functional component "Layout" to structure the layout of the app
  const Layout = () => {
    return (
      //  QueryClientProvider: This component is part of the React Query library, which provides tools for managing data queries.
      //  It wraps the components inside, allowing them to use React Query to fetch and manage data.
      <QueryClientProvider client={queryClient} >
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  // Define a functional component "ProtectedRoute" to protect routes that require authentication
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // If there is no authenticated user, redirect to the login page
      return <Navigate to="/login" />;
    }

    return children;
  };

  // Create the router configuration using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/", // Define the root path
      element: (
        <ProtectedRoute>
          <Layout /> {/* Render the Layout component */}
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/", // Define the home path
          element: <Home />, // Render the Home component
        },
        {
          path: "/profile/:id", // Define the profile path with a dynamic parameter ":id"
          element: <Profile />, // Render the Profile component
        },
      ],
    },
    {
      path: "/login", // Define the login path
      element: <Login />, // Render the Login component
    },
    {
      path: "/register", // Define the register path
      element: <Register />, // Render the Register component
    },
  ]);

  // Return the app's structure wrapped in a RouterProvider
  return (
    <div>
      <RouterProvider router={router} /> {/* Provide the router to the app */}
    </div>
  );
}

// Export the "App" component as the default export of this module
export default App;