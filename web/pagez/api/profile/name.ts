import apiHandler from '@fn/apiHandler';
import { profileApi_changeDisplayName } from '@fn/profile/name';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: profileApi_changeDisplayName },
  })(req, res);
}
