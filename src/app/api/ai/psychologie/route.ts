import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { profileContent, recruiterType } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en psychologie du recrutement. Analyse le profil du candidat du point de vue d'un ${recruiterType}. Retourne un JSON avec: impact (score 0-100), perception (phrase courte), psychologicalTriggers (tableau), biases (phrase sur les biais potentiels), recommandations (tableau de 3 conseils).`
        },
        {
          role: "user",
          content: `Profil du candidat: ${profileContent}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(result);
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
