import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import chatHandler from './api/chat.ts';
import telegramLinkHandler from './api/telegram/link.ts';
import telegramWebhookHandler from './api/telegram/webhook.ts';
import telegramSendHandler from './api/telegram/send.ts';
import remindersProcessHandler from './api/reminders/process.ts';

// Local development middleware plugin to handle /api/* seamlessly in Vite dev
function localBackendApiPlugin(): Plugin {
  const adaptHandler = (handler: (req: any, res: any) => Promise<any>) => {
    return async (req: any, res: any) => {
      let bodyStr = '';
      req.on('data', (chunk: any) => {
        bodyStr += chunk;
      });
      req.on('end', async () => {
        try {
          req.body = bodyStr ? JSON.parse(bodyStr) : {};
        } catch {
          req.body = {};
        }
        const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
        req.query = Object.fromEntries(urlObj.searchParams.entries());

        res.status = (code: number) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        try {
          await handler(req, res);
        } catch (err: any) {
          console.error('API Error:', err);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
          }
        }
      });
    };
  };

  return {
    name: 'local-backend-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        const path = rawUrl.split('?')[0];

        if (path === '/api/chat') {
          return adaptHandler(chatHandler)(req, res);
        }
        if (path === '/api/telegram/link') {
          return adaptHandler(telegramLinkHandler)(req, res);
        }
        if (path === '/api/telegram/webhook') {
          return adaptHandler(telegramWebhookHandler)(req, res);
        }
        if (path === '/api/telegram/send') {
          return adaptHandler(telegramSendHandler)(req, res);
        }
        if (path === '/api/reminders/process') {
          return adaptHandler(remindersProcessHandler)(req, res);
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localBackendApiPlugin()],
  server: {
    host: true,
    port: 3000,
  },
});
