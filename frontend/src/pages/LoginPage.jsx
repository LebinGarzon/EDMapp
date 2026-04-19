import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    if (!form.email.trim() || !form.password.trim()) {
      setMessage("Email y contrasena son obligatorios.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "No fue posible iniciar sesion.");
        setIsError(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage(data.message || "Inicio de sesion exitoso.");
      setIsError(false);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setMessage("No fue posible conectar con el servidor.");
      setIsError(true);
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
            required
          />

          <button type="submit">Ingresar</button>
        </form>

        {message && (
          <p className={isError ? "message error" : "message success"}>
            {message}
          </p>
        )}

        <div className="links">
          <Link to="/register">Crear cuenta</Link>
          <Link to="/recover">Olvide mi contrasena</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;