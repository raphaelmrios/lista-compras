import { NextRequest, NextResponse } from "next/server";

// Corrigido: agora importa do caminho certo
import {
  listarItens,
  criarItem,
  atualizarItem,
  deletarItem,
} from "@/services/itemService";
import { validarItem } from "@/validators/itemValidator";

// GET → Lista todos os itens do banco
export async function GET() {
  const itens = await listarItens();
  return NextResponse.json(itens);
}

// POST → Cria um novo item
export async function POST(req: NextRequest) {
  const { nome, quantidade } = await req.json();
  const erro = validarItem({ nome, quantidade });
  if (erro) return NextResponse.json({ error: erro }, { status: 400 });

  const novo = await criarItem(nome, quantidade);
  return NextResponse.json(novo, { status: 201 });
}

// PUT → Atualiza um item existente
export async function PUT(req: NextRequest) {
  const { id, nome, quantidade } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

  const erro = validarItem({ nome, quantidade });
  if (erro) return NextResponse.json({ error: erro }, { status: 400 });

  const atualizado = await atualizarItem(id, nome, quantidade);
  return NextResponse.json(atualizado);
}

// DELETE → Remove item pelo ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

  await deletarItem(id);
  return NextResponse.json({ message: "Item deletado com sucesso" });
}
