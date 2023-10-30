import apiHandler from '@fn/apiHandler';
import { teamApi_selectTeamUsers } from '@fn/team/users/select';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    GET: { handler: teamApi_selectTeamUsers },
    POST: { handler: async () => {} },
  })(req, res);
}
