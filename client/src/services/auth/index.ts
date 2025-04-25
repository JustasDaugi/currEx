import { User } from "../../types";

const BASE = `${process.env.NEXT_PUBLIC_API_BASE}/api/auth`;

async function request<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error("Invalid credentials");
  if (res.status === 409) throw new Error("UserExists");
  if (!res.ok) throw new Error(`${path}Failed`);
  return res.json();
}

export function login(email: string, password: string) {
  return request<{ token: string; user: User }>("login", { email, password });
}

export function signup(name: string, email: string, password: string) {
  return request<{ token: string; user: User }>("signup", {
    name,
    email,
    password,
  });
}
