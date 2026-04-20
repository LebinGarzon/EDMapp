import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const result = await loginUser({
      email,
      password,
    });

    if (result.ok) {
      setMessage(result.message || "Inicio de sesion exitoso.");
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } else {
      setMessage(result.message || "No fue posible conectar con el servidor.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contrasena</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Ingresar</button>
        </form>

        {message && (
          <p
            style={{
              color: message.toLowerCase().includes("exitoso")
                ? "lightgreen"
                : "#ff6b6b",
            }}
          >
            {message}
          </p>
        )}

        <Link to="/register">Crear cuenta</Link>
        <br />
        <Link to="/recover">Olvide mi contrasena</Link>
      </div>
    </div>
  );
}