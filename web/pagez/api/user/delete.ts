import apiHandler from '@fn/apiHandler';
import { userApi_deleteUser } from '@fn/user/delete';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: userApi_deleteUser },
  })(req, res);
}
