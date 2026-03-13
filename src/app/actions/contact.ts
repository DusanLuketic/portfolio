"use server";

import { Resend } from "resend";
import { contactSchema, type ActionState } from "@/lib/schemas";

export async function sendContactEmail(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validated = contactSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Portfolio Contact: ${validated.data.name}`,
      text: `Name: ${validated.data.name}\nEmail: ${validated.data.email}\n\nMessage:\n${validated.data.message}`,
      replyTo: validated.data.email,
    });

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
