import { ISupabase, ITiers } from '@khofly/core';
import { createPagesServerClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

interface CustomApiHandler {
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    supabaseClient: SupabaseClient,
    user_id: string,
    user_tier: ITiers
  ) => Promise<void | any>;
}

interface HandlerObject {
  GET?: CustomApiHandler;
  POST?: CustomApiHandler;
  PATCH?: CustomApiHandler;
  DELETE?: CustomApiHandler;
}

const apiHandler = (config: HandlerObject) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // check handler supports HTTP method
    if (!config[req.method]) return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { handler } = config[req.method] as CustomApiHandler;

    const supabaseServerClient = createPagesServerClient<ISupabase>({ req, res });

    const { data: data_User, error: error_User } = await supabaseServerClient.auth.getUser();

    // Handle error_User
    if (error_User) return res.status(400).json({ error: true, message: 'No user found', data: null });

    // Fetch user tier
    const { data: data_Tier, error: error_Tier } = await supabaseServerClient
      .from('tiers')
      .select('value')
      .match({ user_id: data_User.user.id });

    // Handle error_Tier
    if (error_Tier) return res.status(400).json({ error: true, message: error_Tier.message, data: null });

    try {
      await handler(req, res, supabaseServerClient, data_User.user.id, data_Tier[0].value);
    } catch (err) {
      // global error handler
      res.status(500).json({ error: true, message: 'Something went wrong', data: err });
    }
  };
};

export default apiHandler;
