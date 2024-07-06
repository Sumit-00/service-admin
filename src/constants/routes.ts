import { ROUTES } from './enums';

export interface INAVIGATION_ROUTE {
  path: ROUTES;
  name: string;
  nestedRoutes?: INAVIGATION_ROUTE[];
}

export const NAVIGATION_ROUTES: Array<INAVIGATION_ROUTE> = [
  {
    path: ROUTES.Analytics,
    name: 'Analytics',
  },
  {
    path: ROUTES.PartnersList,
    name: 'Partners List',
  },
  {
    path: ROUTES.offersList,
    name: 'Offers List',
  },
];
