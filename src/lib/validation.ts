import { z } from "zod";

export const bookingSchema = z.object({
  service: z.string().min(1),
  customerName: z.string().trim().min(2, "Please enter your name").max(120),
  customerEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(200),
  customerPhone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(25),
  preferredDate: z.string().trim().max(40).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(25),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
