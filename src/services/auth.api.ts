import type { User } from "../types";
import { API, handleResponse, mapUser } from "./api";

export async function apiLogin(email: string, password: string): Promise<User> {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return mapUser(await handleResponse(res));
}

export async function apiRegister(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return mapUser(await handleResponse(res));
}
