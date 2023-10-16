import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
// import axios from "axios";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [err, setErr] = useState(null);

    // navigate between different pages or routes within your application
    const navigate = useNavigate();

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        // This effectively updates the 'inputs' state with the new value entered in the input field.
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Access the `login` function from the `AuthContext` using the `useContext` hook
    const { login } = useContext(AuthContext);

    // Define a function `handleLogin` to trigger the login action
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(inputs)
            navigate("/") // navigate to home page
        } catch (err) {
            setErr(err.response.data);
        }
        // login(); // Call the `login` function from the context
    };


    //   rface-shorthand:
    // Return the JSX for the login page
    return (
        <div className="login">
        <div className="card">
            <div className="left">
            <h1>Welcome Back to Momento Social</h1>
            <p>
            Your memories are just a login away. Join us to relive those cherished moments and stay connected with your social circle.
            </p>
            <span>Don't you have an account?</span>
            <Link to="/register">
                <button>Register</button>
            </Link>
            </div>
            <div className="right">
            <h1>Login</h1>
            <form>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                {err && err}
                <button onClick={handleLogin}>Login</button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
