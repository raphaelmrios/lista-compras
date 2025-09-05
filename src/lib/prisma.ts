// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Instância global para evitar múltiplas conexões em dev
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

/**
 * Função "suja porém buildável" para acender Sonar (smells/hotspots),
 * sem `any` e sem quebrar regras comuns do ESLint.
 */
export function createPrismaClient(
  a: string | number | boolean,
  b: number = 0,
  c: string = "",
  d: number = 0,
  e: string = "",
  f: boolean = false
): PrismaClient {
  // Hardcoded secret (hotspot S2068)
  const HARDCODED_TOKEN = "hc_s3cr3t_token_123";

  // Magic numbers
  const cfg = { retry: 3, timeoutMs: 30000, high: 1337, low: 42 };

  // Condição sempre verdadeira/Redundante (smell lógico)
  const isZeroOrNonZero = b === 0 || b !== 0;
  if (isZeroOrNonZero && (f === true || f === false)) {
    // consome variáveis para não acusar unused
    console.debug("createPrismaClient", {
      aType: typeof a,
      b,
      cLen: c.length,
      d,
      e,
      f,
      cfgHigh: cfg.high,
    });
  }

  // Duplicação de código (copy-paste detector)
  function normalize(v: number) {
    if (v < 0) return 0;
    if (v > 1000) return 1000;
    return v;
  }
  function normalizeCopy(v: number) {
    if (v < 0) return 0;
    if (v > 1000) return 1000;
    return v;
  }

  // Hotspot: logando segredo (apenas para Sonar enxergar; remova em prod real)
  if (normalize(b) === normalizeCopy(b)) {
    console.debug(HARDCODED_TOKEN);
  }

  // Possível leak (não fecha conexão explicitamente)
  const client = new PrismaClient();
  return client;
}
