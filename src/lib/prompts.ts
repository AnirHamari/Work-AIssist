export type HumanizationLevel = 1 | 2 | 3;

export const generateCoverLetterPrompt = (
  jobTitle: string,
  company: string,
  jobDescription: string,
  userContext: string,
  level: HumanizationLevel = 2,
  tone: string = "Professionnel",
  experienceLevel: string = "Intermédiaire",
  focus: string = "Compétences techniques"
) => {
  const levelInstructions = {
    1: "Reformulation simple : rends le texte plus clair et professionnel sans trop s'éloigner de la structure initiale.",
    2: "Humanisation + Fluidité : varie la longueur des phrases, utilise des transitions naturelles (du coup, concrètement) et supprime les marqueurs IA.",
    3: "Humanisation + Adaptation + Ton personnalisé : niveau maximum. Introduis des imperfections naturelles, un ton très humain et crédible, adapte le discours au contexte spécifique de l'entreprise comme si un humain l'avait écrit."
  };

  return `
OBJECTIF :
Transformer un texte généré automatiquement en un contenu fluide, naturel, crédible et humain, sans modifier le sens initial.

NIVEAU D'HUMANISATION REQUIS : ${levelInstructions[level]}

PARAMÈTRES DE PERSONNALISATION :
- TON : ${tone}
- NIVEAU D'EXPÉRIENCE : ${experienceLevel}
- AXE PRIORITAIRE : ${focus}

INFORMATIONS SUR LE POSTE :
- Titre : ${jobTitle}
- Entreprise : ${company}
- Description : ${jobDescription}

CONTEXTE DU CANDIDAT :
- Profil : ${userContext}

CONSIGNES DE RÉDACTION (HUMANISATION) :
1. VARIATION DES PHRASES : Mélange phrases courtes, moyennes et longues. Évite le rythme monotone.
2. STYLE NATUREL : Utilise "c’est" au lieu de "cela est", "j’ai" au lieu de "je possède". Pas de style rigide.
3. TRANSITIONS FLUIDES : Utilise des transitions simples : "du coup", "concrètement", "au final", "dans ce contexte".
4. SUPPRESSION DES MARQUEURS IA : INTERDICTION d'utiliser "Il est important de noter que", "Dans le cadre de", "En conclusion", "De plus", "Ainsi".
5. IMPERFECTION CONTRÔLÉE : Le texte ne doit pas être "trop parfait" ou trop symétrique. Il doit sembler écrit par un humain réel.

STRUCTURE :
- Introduction : Naturelle et contextualisée.
- Développement : Expériences concrètes, verbes d'action, résultats réels (pas de "motivé" sans preuve).
- Lien entreprise : Montre une vraie compréhension de ${company}.
- Conclusion : Simple, humaine, sans formule robotique.

Génère uniquement le contenu de la lettre.
`.trim();
};

export const generateCVSuggestionsPrompt = (cvData: any) => {
  return `
Analyse les données suivantes de mon CV et propose des améliorations concrètes.

OBJECTIF : 
Transformer les descriptions vagues en résultats concrets avec des verbes d'action.

CONSIGNES :
1. UTILISER DES VERBES D'ACTION : (développé, conçu, optimisé, analysé, etc.).
2. RÉSULTATS CONCRETS : Remplace les adjectifs creux ("motivé", "dynamique") par des faits et chiffres si possible.
3. CRITIQUE : Analyse la lisibilité et la cohérence globale.

DONNÉES DU CV :
${JSON.stringify(cvData, null, 2)}
`.trim();
};
