import apiHandler from '@fn/apiHandler';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiHandler({
    POST: { handler: async () => {} },
  })(req, res);
}
