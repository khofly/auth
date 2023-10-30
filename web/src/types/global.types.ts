import { NextPage } from 'next';
import React, { Dispatch } from 'react';
import contentJson from 'public/locales/en.json';
import { IProfile, ITiers } from '@khofly/core';

export type ITranslations = typeof contentJson;

// -----------------------------------------------------------------
// For global context
// -----------------------------------------------------------------

export type Global_Context_Action = Base_Action | { type: 'SET_CONTENT'; payload: ITranslations };

export interface Global_Context extends Base_Context<Global_Context_Action> {
  content: ITranslations; // Content fetched from public/locales

  tier: ITiers;
  loadingTier: boolean;

  profile: IProfile;
  loadingProfile: boolean;
}

// -----------------------------------------------------------------
// Global types
// -----------------------------------------------------------------

export interface Base_Context<Action> {
  dispatch: Dispatch<Action>;
}
export type Base_Action = { type: 'INIT'; payload: any };

export interface IFC {
  children?: React.ReactNode;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
