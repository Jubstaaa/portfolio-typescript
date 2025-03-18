"use server";
import { Resend } from "resend";
import { z } from "zod";
import ContactEmail from "@/react-email-starter/emails/ContactEmail";
import { revalidatePath } from "next/cache";


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
