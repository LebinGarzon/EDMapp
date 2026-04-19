import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Bienvenido a EDMapp</h1>

        <p>
          <strong>Usuario:</strong> {user?.full_name || "Usuario autenticado"}
        </p>

        <p>
          <strong>Email:</strong> {user?.email || "No disponible"}
        </p>

        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>
    </div>
  );
}

export default Home;