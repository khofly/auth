import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import { middleware_Error } from './middleware';
import { CORS_OPTIONS } from './config';

import { teamRoutes } from './api/team';
import { userRoutes } from './api/user';
import { profileRoutes } from './api/profile';

const PORT = process.env.NODE_ENV === 'production' ? 3001 : 4001;

// ---------------------------------------------------------------------------------------------------------
// Configure auth REST API - User, Team, Profile
// ---------------------------------------------------------------------------------------------------------

const elysia = new Elysia()

  // Plugins
  .use(cors(CORS_OPTIONS()))

  // Middlewares
  .on('error', middleware_Error) // Handle errors

  // Routes
  .get('/', () => `Khofly Auth API - ${process.env.NODE_ENV}`)

  .use(teamRoutes)
  .use(userRoutes)
  .use(profileRoutes)

  // Listen
  .listen(PORT);

console.log(`🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`);
