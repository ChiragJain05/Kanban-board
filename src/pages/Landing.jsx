import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export default function Landing() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(username, password)) {
      navigate("/board");
    } else {
      alert("Both fields are required");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg w-96 border border-zinc-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Kanban Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
