// Auth SIMULADO con localStorage (para evidencia académica).
// En un sistema real: backend + hash + email para recuperar.

const USERS_KEY = "edmapp_users";

// Leer usuarios guardados (si no hay, devuelve [])
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Guardar usuarios en localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// REGISTRO: crea usuario y lo guarda
export function registerUser({ fullName, email, password, securityAnswer }) {
  const users = loadUsers();

  // Verificar si ya existe el email
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { ok: false, message: "Ese email ya está registrado." };
  }

  // Crear usuario nuevo
  const newUser = {
    id: Date.now(), // id simple
    fullName,
    email,
    password, // ⚠️ demo (en real se encripta)
    securityAnswer,
  };

  users.push(newUser);
  saveUsers(users);

  return { ok: true, message: "Usuario registrado. Ya puedes iniciar sesión." };
}

// LOGIN: valida email + contraseña
export function loginUser({ email, password }) {
  const users = loadUsers();

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return { ok: false, message: "Email o contraseña incorrectos." };
  }

  return { ok: true, message: `Bienvenido/a, ${user.fullName}` };
}

// OLVIDÓ CONTRASEÑA: valida respuesta y cambia contraseña
export function resetPassword({ email, securityAnswer, newPassword }) {
  const users = loadUsers();

  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) {
    return { ok: false, message: "No existe un usuario con ese email." };
  }

  const ok =
    (users[idx].securityAnswer || "").trim().toLowerCase() ===
    (securityAnswer || "").trim().toLowerCase();

  if (!ok) {
    return { ok: false, message: "Respuesta de seguridad incorrecta." };
  }

  users[idx].password = newPassword;
  saveUsers(users);

  return { ok: true, message: "Contraseña actualizada. Ya puedes iniciar sesión." };
}
