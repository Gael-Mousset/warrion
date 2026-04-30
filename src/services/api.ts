import type { User, Warranty } from '../types'

const BASE = 'http://localhost:3000'

function mapUser(doc: any): User {
  const { _id, __v, password, ...rest } = doc
  return {
    id: _id,
    password: '',
    ...rest,
    createdAt: new Date(rest.createdAt).toISOString().split('T')[0],
  }
}

function mapWarranty(doc: any): Warranty {
  const { _id, __v, userId, ...rest } = doc
  return {
    id: _id,
    userId: typeof userId === 'object' && userId !== null ? userId._id ?? String(userId) : String(userId),
    ...rest,
    createdAt: new Date(rest.createdAt).toISOString().split('T')[0],
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const msg = Array.isArray(data.message) ? data.message[0] : data.message
    throw new Error(msg ?? 'Erreur serveur.')
  }
  return res.json()
}

export async function apiLogin(email: string, password: string): Promise<User> {
  const res = await fetch(`${BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return mapUser(await handleResponse(res))
}

export async function apiRegister(name: string, email: string, password: string): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return mapUser(await handleResponse(res))
}

export async function apiGetWarranties(userId: string): Promise<Warranty[]> {
  const res = await fetch(`${BASE}/warranties/user/${userId}`)
  const data = await handleResponse<any[]>(res)
  return data.map(mapWarranty)
}

export async function apiCreateWarranty(data: Omit<Warranty, 'id' | 'createdAt'>): Promise<Warranty> {
  const res = await fetch(`${BASE}/warranties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return mapWarranty(await handleResponse(res))
}

export async function apiUpdateWarranty(id: string, data: Omit<Warranty, 'id' | 'createdAt'>): Promise<Warranty> {
  const res = await fetch(`${BASE}/warranties/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return mapWarranty(await handleResponse(res))
}

export async function apiDeleteWarranty(id: string): Promise<void> {
  const res = await fetch(`${BASE}/warranties/${id}`, { method: 'DELETE' })
  await handleResponse(res)
}
