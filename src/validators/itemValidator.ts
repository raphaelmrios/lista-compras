// Função que valida os campos do item (nome e quantidade)
export function validarItem({
  nome,
  quantidade,
}: {
  nome: unknown;
  quantidade: unknown;
}): string | null {
  if (typeof nome !== "string" || nome.trim() === "") {
    return "Nome inválido";
  }

  if (typeof quantidade !== "number" || isNaN(quantidade)) {
    return "Quantidade inválida";
  }

  return null; // sem erro
}
