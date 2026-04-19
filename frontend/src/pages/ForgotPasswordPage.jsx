import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMsg("La nueva contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    const r = resetPassword({ email, securityAnswer, newPassword });
    setMsg(r.message);
  }

  return (
    <div style={{ padding: 16, maxWidth: 520 }}>
      <h2>Olvidé mi contraseña</h2>
      <p>Recuperación simulada con respuesta de seguridad (sin backend).</p>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />

        <label>Respuesta de seguridad</label>
        <input
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />

        <label>Nueva contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />

        <button type="submit">Actualizar contraseña</button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      <p style={{ marginTop: 12 }}>
        <Link to="/login">Volver a Login</Link>
      </p>
    </div>
  );
}
