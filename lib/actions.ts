"use server";
import { Resend } from "resend";
import { z } from "zod";
import ContactEmail from "@/react-email-starter/emails/ContactEmail";
import { revalidatePath } from "next/cache";
import { buildProfileKnowledge } from "@/lib/ai/profile-knowledge";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const DEFAULT_MODEL = "meta-llama/llama-3.1-70b-instruct";
const SYSTEM_PROMPT = `You are Ilker Balcilar's personal portfolio assistant. Your role is to help visitors learn about Ilker's professional background, projects, technology expertise, and work experience.

Key guidelines:
- Always respond in English, as all content in the database is in English
- Format your responses using Markdown syntax for better readability:
  * Use **bold** for emphasis on important terms (project names, technologies, etc.)
  * Use bullet points (-) or numbered lists (1.) for lists
  * Use headings (##) to organize longer responses
  * Use [link text](url) format for links when mentioning projects or resources
  * Use \`code\` for technology names and technical terms
- Provide accurate, detailed information based on the knowledge base provided
- When mentioning projects, include relevant technologies, links (if available), and brief descriptions
- Reference specific projects, blog posts, or experiences when relevant to answer questions
- Be conversational and helpful, but stay professional
- If you don't know something, admit it honestly and suggest they check the portfolio or contact Ilker directly
- Use clear paragraphs and bullet points when appropriate
- When discussing tech stack, be specific about which technologies were used in which projects
- Always provide context - don't just list facts, explain how they relate to the question`;


export interface SendMailResponse {
  ok?: boolean;
  errors?: {
    [key: string]: string[] | undefined;
  };
}

const schema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  description: z.string().min(1),
});

export const sendContactMail = async (
  formData: FormData
): Promise<SendMailResponse> => {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 3000)); // Fancy loading :)

  const resend = new Resend(process.env.RESEND_API_KEY);

  const res = await resend.emails.send({
    from: "noreply@ilkerbalcilar.com",
    to: "ilkerbalcilartr@gmail.com",
    subject: "New Contact Form Submission",
    react: ContactEmail({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
    }),
  });

  if (!res.error) {
    return { ok: true };
  }

  return { ok: false };
};

export interface ChatResponse extends SendMailResponse {
  reply?: string;
}

const chatSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export const sendChatMessage = async (
  formData: FormData
): Promise<ChatResponse> => {
  if (!process.env.OPENROUTER_API_KEY) {
    return {
      errors: {
        message: ["OPENROUTER_API_KEY is missing. Please check your .env file."],
      },
    };
  }

  const validatedFields = chatSchema.safeParse({
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      headers: {
        "HTTP-Referer": "https://ilkerbalcilar.com",
        "X-Title": "IlkerAI",
      },
    });

    const knowledge = await buildProfileKnowledge();
    const result = await generateText({
      model: openrouter(DEFAULT_MODEL),
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `User question: """${validatedFields.data.message}"""\n\nCurrent information about Ilker Balcilar:\n${knowledge}\n\nPlease answer the user's question based on the information provided above. If the information is not available in the knowledge base, say so honestly.`,
        },
      ],
    });

    const reply = result.text.trim();
    if (!reply) {
      return {
        errors: {
          message: ["Model returned empty response"],
        },
      };
    }

    return { ok: true, reply };
  } catch (error) {
    console.error("[chat-action]", error);
    return {
      errors: {
        message: ["An unexpected error occurred"],
      },
    };
  }
};

export async function revalidatePaths(
  paths: {
    path: string;
    type?: "page" | "layout";
  }[]
) {
  paths.forEach(
    ({
      path,
      type = undefined,
    }: {
      path: string;
      type?: "page" | "layout" | undefined;
    }) => {
      if (type) {
        revalidatePath(`/(frontend)${path}`, type);
      } else {
        revalidatePath(path);
      }
    }
  );
}
