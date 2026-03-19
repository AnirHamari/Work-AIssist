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
    const { jobTitle, company, content } = await req.json();

    const letter = await prisma.coverLetter.create({
      data: {
        userId: session.user.id,
        jobTitle,
        company,
        content,
      },
    });

    return NextResponse.json(letter, { status: 201 });
  } catch (error) {
    console.error("Error saving letter:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const letters = await prisma.coverLetter.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(letters);
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
