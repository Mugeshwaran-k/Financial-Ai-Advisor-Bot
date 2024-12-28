import { openai } from '@ai-sdk/openai';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { streamText } from 'ai';
import { Hono } from 'hono';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string(),
});

export const maxDuration = 30;

const app = new Hono()
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', chatSchema.pick(
      { message: true },
    )),
    async (c) => {
      const auth = getAuth(c);
      const { message } = c.req.valid('json');
      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

       const messages = [
      {
        id: createId(),
        role: 'user',
        content: message,
      },
    ];

    const result = streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          id: createId(),
          role: 'system',
          content: 'You are a helpful AI assistant that helps users with their finances.',
        },
        ...messages,
      ] as any,
    });

    return new Response(result.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  })
;

export default app;
