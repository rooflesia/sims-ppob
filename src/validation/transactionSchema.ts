import { z } from "zod";

export const topUpSchema = z.object({
  amount: z.number()
    .min(10000, "Minimal top-up adalah 10.000.")
    .max(1000000, "Maksimal top-up adalah 1.000.000."),
});

export const paymentSchema = z.object({
  service_id: z.number().min(1, "Pilih layanan yang valid."),
});
