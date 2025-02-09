import * as z from "zod";

export const settingsFormSchema = z.object({
  school_name: z.string().min(1, "School name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  facebook_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagram_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  admission_email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  support_email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  office_hours: z.string().optional(),
  meta_description: z
    .string()
    .max(160, "Meta description should not exceed 160 characters")
    .optional(),
  meta_keywords: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
