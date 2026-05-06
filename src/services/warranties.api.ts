import type { Warranty } from "../types";
import { API, handleResponse, mapWarranty } from "./api";

export async function apiGetWarranties(userId: string): Promise<Warranty[]> {
  const res = await fetch(`${API}/warranties/user/${userId}`);
  const data = await handleResponse<any[]>(res);
  return data.map(mapWarranty);
}

export async function apiCreateWarranty(
  data: Omit<Warranty, "id" | "createdAt">,
): Promise<Warranty> {
  const res = await fetch(`${API}/warranties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return mapWarranty(await handleResponse(res));
}

export async function apiUpdateWarranty(
  id: string,
  data: Omit<Warranty, "id" | "createdAt">,
): Promise<Warranty> {
  const res = await fetch(`${API}/warranties/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return mapWarranty(await handleResponse(res));
}

export async function apiDeleteWarranty(id: string): Promise<void> {
  const res = await fetch(`${API}/warranties/${id}`, { method: "DELETE" });
  await handleResponse(res);
}
