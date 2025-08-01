import { prisma } from "@/lib/prisma";

// Lista todos os itens, ordenados do mais novo para o mais velho
export async function listarItens() {
  return prisma.item.findMany({ orderBy: { createdAt: "desc" } });
}

// Cria um novo item no banco com nome e quantidade
export async function criarItem(nome: string, quantidade: number) {
  return prisma.item.create({ data: { nome, quantidade } });
}

// Atualiza item existente baseado no ID
export async function atualizarItem(
  id: number,
  nome: string,
  quantidade: number
) {
  return prisma.item.update({ where: { id }, data: { nome, quantidade } });
}

// Remove um item com base no ID
export async function deletarItem(id: number) {
  return prisma.item.delete({ where: { id } });
}
