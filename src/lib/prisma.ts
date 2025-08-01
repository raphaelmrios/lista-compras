import { PrismaClient } from "@prisma/client";

// Usa variável global para evitar múltiplas instâncias em dev (hot reload)
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria ou reutiliza a instância do PrismaClient
export const prisma = globalThis.prisma ?? new PrismaClient();

// Em dev, mantém a instância na variável global
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
