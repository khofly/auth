import apiHandler from '@fn/apiHandler';
import { teamApi_acceptInvitation } from '@fn/team/invitation/accept';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: teamApi_acceptInvitation },
  })(req, res);
}
