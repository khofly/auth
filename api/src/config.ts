import path from 'path';
import { HTTPMethod } from '@elysiajs/cors';

export const __dirname = new URL('.', import.meta.url).pathname;

export const STATIC_OPTIONS = {
  assets: path.join(__dirname, `/../temp`),
  prefix: '/temp',
};

const whitelistStag = ['https://staging-auth.khofly.com', 'http://localhost:3001'];
const whitelistProd = ['https://staging-auth.khofly.com', 'https://auth.khofly.com'];

export const CORS_OPTIONS = () => {
  const whitelist = process.env.NODE_ENV === 'development' ? whitelistStag : whitelistProd;

  return {
    origin(req: Request) {
      const found = !!whitelist.find((d) => d === req.headers.get('origin'));

      return found;
    },
    methods: ['GET', 'POST', 'OPTIONS'] as HTTPMethod[],
    allowedHeaders: ['Content-Type', 'Authorization', 'SB-Refresh-Token'],
    exposedHeaders: ['Content-Type'],
  };
};
