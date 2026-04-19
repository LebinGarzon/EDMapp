import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    security_answer: "",
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
      !form.full_name.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.security_answer.trim()
    ) {
      setMessage("Todos los campos son obligatorios.");
      setIsError(true);
      return;
    }

    if (form.password.length < 6) {
      setMessage("La contrasena debe tener minimo 6 caracteres.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Error al registrar usuario.");
        setIsError(true);
        return;
      }

      setMessage(data.message || "Usuario registrado correctamente.");
      setIsError(false);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage("No fue posible conectar con el servidor.");
      setIsError(true);
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
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Contrasena</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
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

          <button type="submit">Crear cuenta</button>
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

export default Register;