const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, "[]", "utf8");
}

function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

app.get("/", (req, res) => {
  res.send("API EDMapp funcionando correctamente v2");
});

app.post("/api/register", (req, res) => {
  const { full_name, email, password, security_answer } = req.body;

  if (
    !full_name?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !security_answer?.trim()
  ) {
    return res.status(400).json({
      ok: false,
      message: "Todos los campos son obligatorios."
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      ok: false,
      message: "El correo electronico no es valido."
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      ok: false,
      message: "La contrasena debe tener minimo 6 caracteres."
    });
  }

  const users = loadUsers();

  const exists = users.some(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    return res.status(409).json({
      ok: false,
      message: "Ese email ya esta registrado."
    });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = {
    id: Date.now(),
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    security_answer: security_answer.trim().toLowerCase(),
    passwordHash
  };

  users.push(newUser);
  saveUsers(users);

  return res.status(201).json({
    ok: true,
    message: "Usuario registrado correctamente."
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({
      ok: false,
      message: "Email y contrasena son obligatorios."
    });
  }

  const users = loadUsers();

  const user = users.find(
    (u) => u.email && u.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "Usuario no encontrado."
    });
  }

  const validPassword = bcrypt.compareSync(password, user.passwordHash);

  if (!validPassword) {
    return res.status(401).json({
      ok: false,
      message: "Contrasena incorrecta."
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Inicio de sesion exitoso.",
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email
    }
  });
});

app.post("/api/recover", (req, res) => {
  const { email, security_answer, new_password } = req.body;

  if (!email?.trim() || !security_answer?.trim() || !new_password?.trim()) {
    return res.status(400).json({
      ok: false,
      message: "Todos los campos son obligatorios."
    });
  }

  if (new_password.length < 6) {
    return res.status(400).json({
      ok: false,
      message: "La nueva contrasena debe tener minimo 6 caracteres."
    });
  }

  const users = loadUsers();

  const userIndex = users.findIndex(
    (u) => u.email && u.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (userIndex === -1) {
    return res.status(404).json({
      ok: false,
      message: "Usuario no encontrado."
    });
  }

  if (
    users[userIndex].security_answer !== security_answer.trim().toLowerCase()
  ) {
    return res.status(401).json({
      ok: false,
      message: "La respuesta de seguridad es incorrecta."
    });
  }

  users[userIndex].passwordHash = bcrypt.hashSync(new_password, 10);
  saveUsers(users);

  return res.status(200).json({
    ok: true,
    message: "Contrasena actualizada correctamente."
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});