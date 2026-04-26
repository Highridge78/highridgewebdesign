import { z } from "zod";

export const contactPayloadSchema = z
  .object({
    name: z.string().trim().min(2, "Name is required").max(120, "Name is too long"),
    email: z
      .string()
      .trim()
      .max(255, "Email is too long")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .trim()
      .max(40, "Phone is too long")
      .optional()
      .or(z.literal("")),
    business: z
      .string()
      .trim()
      .max(120, "Business is too long")
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .trim()
      .max(255, "Website is too long")
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(10, "Project details must be at least 10 characters")
      .max(5000, "Project details are too long"),
    botcheck: z
      .string()
      .trim()
      .max(255, "Botcheck value is too long")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "";

    if (!email && !phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Email or phone is required",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Email or phone is required",
      });
    }

    if (email && !z.string().email().safeParse(email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Email must be valid",
      });
    }
  });

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export function normalizeContactPayload(payload: ContactPayload) {
  return {
    name: payload.name.trim(),
    email: payload.email?.trim() || "",
    phone: payload.phone?.trim() || "",
    business: payload.business?.trim() || "",
    website: payload.website?.trim() || "",
    message: payload.message.trim(),
    botcheck: payload.botcheck?.trim() || "",
  };
}
