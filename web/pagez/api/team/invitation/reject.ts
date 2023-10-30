import apiHandler from '@fn/apiHandler';
import { teamApi_acceptInvitation } from '@fn/team/invitation/accept';
import { teamApi_rejectInvitation } from '@fn/team/invitation/reject';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: teamApi_rejectInvitation },
  })(req, res);
}
