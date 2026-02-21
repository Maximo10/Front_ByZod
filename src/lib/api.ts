const API_URL = "http://localhost:3000"; // Cambia si tu backend corre en otro puerto

export async function register(data: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function me(token: string) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function logoutRequest(token: string) {
  const res = await fetch(`${API_URL}/auth/logout`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}