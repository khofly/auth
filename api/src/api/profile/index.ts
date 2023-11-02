import Elysia from 'elysia';
import { supabaseUser } from '../../../lib/supabaseUser';
import { handleChangeAvatar } from './changeAvatar.service';
import { handleChangeName } from './changeName.service';

export const profileRoutes = (app: Elysia) =>
  app.group('/profile', (app) =>
    app
      // Get user id & tier
      .use(supabaseUser)

      .post('/name', handleChangeName)
      .post('/avatar', handleChangeAvatar)
  );
