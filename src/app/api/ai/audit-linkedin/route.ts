import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { profileUrl } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en recrutement et SEO LinkedIn. Analyse le profil LinkedIn fourni et retourne un JSON avec: score (0-100), metrics (tableau d'objets avec label, value, status, tips), heatmap (tableau de 5 nombres), topKeywords, missingKeywords. Sois très précis et professionnel."
        },
        {
          role: "user",
          content: `Analyse ce profil LinkedIn: ${profileUrl}`
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
