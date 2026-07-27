import { z } from 'zod';

export const buildInfoSchema = z.object({
  build_marker: z.string().min(1),
  anthropic_stream: z.object({
    first_event_timeout_default_ms: z.number().int().positive(),
    idle_timeout_default_ms: z.number().int().positive(),
    first_event_timeout_active_ms: z.number().int().positive(),
    idle_timeout_active_ms: z.number().int().positive(),
  }),
  checked_at: z.string().datetime({ offset: true }),
});

export type BuildInfo = z.infer<typeof buildInfoSchema>;
