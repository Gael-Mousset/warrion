// src/data/mockData.ts
import type { Warranty } from "../types";

const today = new Date().toISOString().split("T")[0];

export const MOCK_WARRANTIES: Warranty[] = [
  {
    id: "w1",
    userId: "demo",
    name: "iPhone 15 Pro",
    category: "electronique",
    purchaseDate: "2024-03-01",
    warrantyDurationMonths: 24,
    photoUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    notes: "AppleCare+ inclus. N° de série : XYZ123456",
    createdAt: today,
  },
  {
    id: "w2",
    userId: "demo",
    name: "Lave-linge Bosch Série 6",
    category: "electromenager",
    purchaseDate: "2022-06-15",
    warrantyDurationMonths: 36,
    photoUrl:
      "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=600&q=80",
    notes: "1400 tr/min — contrat maintenance Darty",
    createdAt: today,
  },
  {
    id: "w3",
    userId: "demo",
    name: "Casque Sony WH-1000XM5",
    category: "electronique",
    purchaseDate: "2024-01-10",
    warrantyDurationMonths: 14,
    photoUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
    notes: "",
    createdAt: today,
  },
  {
    id: "w4",
    userId: "demo",
    name: 'MacBook Pro M3 14"',
    category: "informatique",
    purchaseDate: "2024-09-01",
    warrantyDurationMonths: 12,
    photoUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    notes: "16GB RAM — AppleCare à renouveler",
    createdAt: today,
  },
  {
    id: "w5",
    userId: "demo",
    name: "Perceuse Bosch Professional",
    category: "outillage",
    purchaseDate: "2023-04-20",
    warrantyDurationMonths: 36,
    photoUrl:
      "https://images.unsplash.com/photo-1581147036324-c17ac6a85dcf?w=600&q=80",
    notes: "",
    createdAt: today,
  },
];

export const DEMO_USER = {
  id: "demo",
  email: "demo@coffre.fr",
  name: "Marie Demo",
  password: "demo123",
  createdAt: today,
};
