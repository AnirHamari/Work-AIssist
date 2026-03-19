import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { jobTitle, difficulty, messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Tu es un recruteur expert pour le poste de ${jobTitle}. Niveau de difficulté: ${difficulty}. Ta mission est de mener l'entretien, de poser des questions pertinentes et de fournir un feedback constructif à chaque étape. Retourne un JSON avec: content (ta réponse/prochaine question), feedback (conseil pour l'utilisateur sur sa dernière réponse), score (score de 0-100 pour sa dernière réponse).`
        },
        ...messages.map((m: any) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content
        }))
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
