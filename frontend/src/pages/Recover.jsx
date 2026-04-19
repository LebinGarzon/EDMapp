import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

function Recover() {
  const [form, setForm] = useState({
    email: "",
    security_answer: "",
    new_password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (
      !form.email.trim() ||
      !form.security_answer.trim() ||
      !form.new_password.trim()
    ) {
      setMessage("Todos los campos son obligatorios.");
      setIsError(true);
      return;
    }

    if (form.new_password.length < 6) {
      setMessage("La nueva contrasena debe tener minimo 6 caracteres.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/recover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "No fue posible recuperar la contrasena.");
        setIsError(true);
        return;
      }

      setMessage(data.message || "Contrasena actualizada correctamente.");
      setIsError(false);
    } catch (error) {
      setMessage("No fue posible conectar con el servidor.");
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Recuperar contrasena</h1>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Respuesta de seguridad</label>
          <input
            type="text"
            name="security_answer"
            value={form.security_answer}
            onChange={handleChange}
            required
          />

          <label>Nueva contrasena</label>
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <button type="submit">Actualizar contrasena</button>
        </form>

        {message && (
          <p className={isError ? "message error" : "message success"}>
            {message}
          </p>
        )}

        <Link to="/login">Volver a login</Link>
      </div>
    </div>
  );
}

export default Recover;