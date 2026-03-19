import { NextResponse } from "next/navigation";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { goal, steps, progress } = await req.json();
    const roadmap = await prisma.careerRoadmap.upsert({
      where: { userId: session.user.id },
      update: {
        goal,
        steps: JSON.stringify(steps),
        progress,
      },
      create: {
        userId: session.user.id,
        goal,
        steps: JSON.stringify(steps),
        progress,
      },
    });
    return NextResponse.json(roadmap);
  } catch (error) {
    return NextResponse.json({ error: "Error updating roadmap" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const roadmap = await prisma.careerRoadmap.findUnique({
      where: { userId: session.user.id },
    });
    return NextResponse.json(roadmap);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching roadmap" }, { status: 500 });
  }
}
