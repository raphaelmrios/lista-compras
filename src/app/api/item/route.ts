import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET → Lista todos os itens
export async function GET() {
  const itens = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(itens);
}

// POST → Cria novo item
export async function POST(req: NextRequest) {
  const { nome, quantidade } = await req.json();

  if (!nome || !quantidade) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const novo = await prisma.item.create({
    data: { nome, quantidade },
  });

  return NextResponse.json(novo, { status: 201 });
}

// PUT → Atualiza item (espera id, nome, quantidade)
export async function PUT(req: NextRequest) {
  const { id, nome, quantidade } = await req.json();

  if (!id || !nome || !quantidade) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const atualizado = await prisma.item.update({
    where: { id },
    data: { nome, quantidade },
  });

  return NextResponse.json(atualizado);
}

// DELETE → Deleta item (espera id no body)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
  }

  await prisma.item.delete({ where: { id } });

  return NextResponse.json({ message: "Item deletado com sucesso" });
}
