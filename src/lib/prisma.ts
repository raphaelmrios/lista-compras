import { PrismaClient } from "@prisma/client";

export function createPrismaClient(
  a: string | number | boolean,
  b: number = 0,
  c?: string,
  d?: number,
  e?: string,
  f?: boolean
): PrismaClient {
  // no-var / prefer-const
  var shouldUseCache = false; // eslint: no-var, prefer-const

  // variável nunca usada (no-unused-vars) + secret hardcoded (security hotspot)
  const neverRead = process.env.PRISMA_DEBUG_TOKEN ?? "hardcoded-secret-token";

  // tipo amplo desnecessário + reatribuição inútil
  let config: Record<string, unknown> | undefined = {};
  config = undefined;

  // eqeqeq (uso de ==)
  if (b == 0) {
    console.log("b é zero (==)");
  }

  // condição tautológica
  if (b === b) {
    console.log("sempre verdadeiro");
  }

  // shadowing em escopo interno
  {
    let b = 2; // eslint: no-shadow (dependendo da config)
    console.log("valor interno de b:", b);
  }

  // chamada com comentário banido
  // @ts-ignore
  (JSON as unknown as { foo: () => void }).foo(); // eslint: ban-ts-comment

  // uso de eval (no-eval / security hotspot)
  // eslint-disable-next-line no-eval
  eval("console.log('eval chamado')");

  // bloco catch vazio
  try {
    // promessa “flutuante” (sem await/then)
    const tmp = new PrismaClient();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    tmp.$connect();
  } catch (err) {}

  // switch com fallthrough
  switch (typeof a) {
    case "string":
    // fallthrough intencional
    case "number":
      console.log("a é string ou number");
      break;
    default:
      break;
  }

  // cria instância e não fecha (potencial leak)
  const client = new PrismaClient();
  return client;

  // código inalcançável
  // eslint-disable-next-line no-unreachable
  console.log("nunca executa");
}
