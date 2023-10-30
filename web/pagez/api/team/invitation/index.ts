import apiHandler from '@fn/apiHandler';
import { teamApi_selectInvitations } from '@fn/team/invitation/select';
import { teamApi_inviteUser } from '@fn/team/invite';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    GET: { handler: teamApi_selectInvitations },
    POST: { handler: teamApi_inviteUser },
  })(req, res);
}
