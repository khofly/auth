import apiHandler from '@fn/apiHandler';
import { teamApi_createTeam } from '@fn/team/create';
import { teamApi_selectTeams } from '@fn/team/select';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    GET: { handler: teamApi_selectTeams },
    POST: { handler: teamApi_createTeam },
  })(req, res);
}
