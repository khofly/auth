import apiHandler from '@fn/apiHandler';
import { profileApi_changeAvatarUrl } from '@fn/profile/avatar';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: profileApi_changeAvatarUrl },
  })(req, res);
}
