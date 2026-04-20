const API_URL = "https://edmapp-backend.onrender.com";

async function enviarPeticion(ruta, datos) {
  try {
    const response = await fetch(`${API_URL}${ruta}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error real:", error);
    return {
      ok: false,
      message: "No fue posible conectar con el servidor.",
    };
  }
}

export async function registerUser(arg1, arg2, arg3, arg4) {
  let datos;

  if (typeof arg1 === "object" && arg1 !== null) {
    datos = {
      full_name: arg1.fullName,
      email: arg1.email,
      password: arg1.password,
      security_answer: arg1.securityAnswer,
    };
  } else {
    datos = {
      full_name: arg1,
      email: arg2,
      password: arg3,
      security_answer: arg4,
    };
  }

  return await enviarPeticion("/api/register", datos);
}

export async function loginUser(arg1, arg2) {
  let datos;

  if (typeof arg1 === "object" && arg1 !== null) {
    datos = {
      email: arg1.email,
      password: arg1.password,
    };
  } else {
    datos = {
      email: arg1,
      password: arg2,
    };
  }

  return await enviarPeticion("/api/login", datos);
}

export async function recoverPassword(arg1, arg2, arg3) {
  let datos;

  if (typeof arg1 === "object" && arg1 !== null) {
    datos = {
      email: arg1.email,
      security_answer: arg1.securityAnswer,
      new_password: arg1.newPassword,
    };
  } else {
    datos = {
      email: arg1,
      security_answer: arg2,
      new_password: arg3,
    };
  }

  return await enviarPeticion("/api/recover", datos);
}