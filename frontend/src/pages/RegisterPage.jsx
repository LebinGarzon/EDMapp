import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const result = await registerUser({
      fullName,
      email,
      password,
      securityAnswer,
    });

    
    if (result.ok) {
      setMessage(result.message || "Usuario registrado correctamente.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setMessage(result.message || "No fue posible conectar con el servidor.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Registro</h1>

        <form onSubmit={handleSubmit}>
          <label>Nombre completo</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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

          <label>Respuesta de seguridad</label>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />

          <button type="submit">Crear cuenta</button>
        </form>

        {message && (
          <p
            style={{
              color: message.toLowerCase().includes("correctamente")
                ? "lightgreen"
                : "#ff6b6b",
            }}
          >
            {message}
          </p>
        )}

        <Link to="/login">Volver a login</Link>
      </div>
    </div>
  );
}