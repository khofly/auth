import Elysia from 'elysia';
import { supabaseUser } from '../../../lib/supabaseUser';
import { handleUserDelete } from './deleteUser.service';

export const userRoutes = (app: Elysia) =>
  app.group('/user', (app) =>
    app
      // Get user id & tier
      .use(supabaseUser)

      .post('/delete', handleUserDelete)
  );
