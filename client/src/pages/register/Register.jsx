import { Link } from 'react-router-dom';
import "./register.scss";
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });

    const [err, setErr] = useState(null);


   // Function to handle changes in form inputs
const handleChange = (e) => {
    // Use the spread operator (...) to create a copy of the current 'inputs' state.
    // We use 'prev' to represent the previous state.
    // [e.target.name]: e.target.value sets the property (field name) in 'inputs' to the new value entered in the corresponding input field.
    // The 'name' attribute of each input field matches the property name in 'inputs'.
    // For example, 'name="username"' matches 'inputs.username'.

    // This effectively updates the 'inputs' state with the new value entered in the input field.

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
    // console.log(inputs);

    const handelClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs)

        } catch (err) {
            setErr(err.response.data);
        }
    }
    console.log(err);

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Lama Social.</h1>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                    alias totam numquam ipsa exercitationem dignissimos, error nam,
                    consequatur.
                    </p>
                    <span>Do you have an account?</span>
                    {/* Create Login Link */}
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                <h1>Register</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                    />
                     {err && err} {/* Display error message if err state exists */}
                    <button onClick={handelClick}>Register</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Register