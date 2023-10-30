import apiHandler from '@fn/apiHandler';
import { teamApi_deleteTeam } from '@fn/team/delete';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: teamApi_deleteTeam },
  })(req, res);
}
