import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import { middleware_Error } from './middleware';
import { CORS_OPTIONS } from './config';

import { teamRoutes } from './api/team';
import { userRoutes } from './api/user';
import { profileRoutes } from './api/profile';

// ---------------------------------------------------------------------------------------------------------
// Configure docs REST API - Convert, Upload, Download
// ---------------------------------------------------------------------------------------------------------

const elysia = new Elysia()

  // Plugins
  .use(cors(CORS_OPTIONS()))

  // Middlewares
  .on('error', middleware_Error) // Handle errors

  // Routes
  .get('/', () => 'Khofly Auth API')

  .use(teamRoutes)
  .use(userRoutes)
  .use(profileRoutes)

  // ---------------------------------------------------------------------------------------------------------
  // WIP: Configure docs Collaboration API - Hocuspocus custom implementation with Buns WebSocket
  // ---------------------------------------------------------------------------------------------------------
  // .ws('/collab', handleHocuspocus)

  // Listen
  .listen(4001);

console.log(`🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`);
