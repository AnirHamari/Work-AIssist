import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const { title, content } = await req.json();

    const cv = await prisma.cV.create({
      data: {
        userId: session.user.id,
        title,
        content: JSON.stringify(content),
      },
    });

    return NextResponse.json(cv, { status: 201 });
  } catch (error) {
    console.error("Error saving CV:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const cvs = await prisma.cV.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cvs);
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
