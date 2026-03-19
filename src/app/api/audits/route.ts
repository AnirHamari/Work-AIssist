import { NextResponse } from "next/navigation";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { profileUrl, result, score } = await req.json();
    const audit = await prisma.linkedInAudit.create({
      data: {
        userId: session.user.id,
        profileUrl,
        result: JSON.stringify(result),
        score,
      },
    });
    return NextResponse.json(audit);
  } catch (error) {
    return NextResponse.json({ error: "Error creating audit" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const audits = await prisma.linkedInAudit.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audits);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching audits" }, { status: 500 });
  }
}
