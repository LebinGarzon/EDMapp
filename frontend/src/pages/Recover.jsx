import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recoverPassword } from "../services/auth";

export default function RecoverPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const result = await recoverPassword({
      email,
      securityAnswer,
      newPassword,
    });

    alert(JSON.stringify(result));

    if (result.ok) {
      setMessage(result.message || "Contrasena actualizada correctamente.");
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
        <h1>Recuperar PRUEBA</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Respuesta de seguridad</label>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />

          <label>Nueva contrasena</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">Actualizar TEST</button>
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