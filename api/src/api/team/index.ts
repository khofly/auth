import Elysia from 'elysia';
import { supabaseUser } from '../../../lib/supabaseUser';

import { handleTeamCreate } from './createTeam.service';
import { handleTeamDelete } from './deleteTeam.service';
import { handleTeamsSelect } from './selectTeams.service';
import { handleTeamUsersSelect } from './selectTeamUsers.service';
import { handleUserInvitationsSelect } from './selectUserInvitations.service';
import { handleInvitationCreate } from './createInvitation.service';
import { handleInvitationAccept } from './acceptInvitation.service';
import { handleInvitationReject } from './rejectInvitation.service';

export const teamRoutes = (app: Elysia) =>
  app.group('/team', (app) =>
    app
      // Get user id & tier
      .use(supabaseUser)

      // Team apis
      .post('', handleTeamCreate)
      .post('/delete', handleTeamDelete)
      .get('', handleTeamsSelect)
      .get('/user', handleTeamUsersSelect)

      // Invitation apis
      .get('/invitation', handleUserInvitationsSelect)
      .post('/invitation', handleInvitationCreate)
      .post('/invitation/accept', handleInvitationAccept)
      .post('/invitation/reject', handleInvitationReject)
  );
