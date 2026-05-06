import type { User, Warranty } from "../types";

export const BASE = import.meta.env.VITE_API_LOCAL_URL;
export const API = `${BASE}/api`;

export async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const msg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(msg ?? "Erreur serveur.");
  }
  return res.json();
}

export function mapUser(doc: any): User {
  const { _id, __v, password, ...rest } = doc;
  return {
    id: _id,
    password: "",
    ...rest,
    createdAt: new Date(rest.createdAt).toISOString().split("T")[0],
  };
}

export function mapWarranty(doc: any): Warranty {
  const { _id, __v, userId, ...rest } = doc;
  return {
    id: _id,
    userId:
      typeof userId === "object" && userId !== null
        ? (userId._id ?? String(userId))
        : String(userId),
    ...rest,
    createdAt: new Date(rest.createdAt).toISOString().split("T")[0],
  };
}
