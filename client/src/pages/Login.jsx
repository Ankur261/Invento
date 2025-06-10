import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/users/login", {
                email,
                password,
            });
           
            localStorage.setItem("user", JSON.stringify(response.data));
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user?.name);
            
            navigate("/"); // redirect to dashboard
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
