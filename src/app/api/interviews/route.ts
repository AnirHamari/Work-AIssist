import { NextResponse } from "next/navigation";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { jobTitle, messages, score } = await req.json();
    const interview = await prisma.interviewSimulation.create({
      data: {
        userId: session.user.id,
        jobTitle,
        messages: JSON.stringify(messages),
        score,
      },
    });
    return NextResponse.json(interview);
  } catch (error) {
    return NextResponse.json({ error: "Error creating interview" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const interviews = await prisma.interviewSimulation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(interviews);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching interviews" }, { status: 500 });
  }
}
