import { INAVIGATION_ROUTE, NAVIGATION_ROUTES } from '@/constants/routes';

import SubNavigation from './SubNavigation';
import Link from './ui/link';

export default function RenderNavigation() {
  return (
    <div className="border-border mt-6 h-screen-minus-header border-t pt-4 text-a16 sm:mt-0 sm:w-[240px] sm:border-t-0 sm:pt-0">
      {NAVIGATION_ROUTES.map((route: INAVIGATION_ROUTE) => {
        const isNestedRoutes = (route?.nestedRoutes || []).length > 0;
        return isNestedRoutes ? (
          <SubNavigation section={route} key={route.path} className="mt-4 min-w-full first:mt-0" />
        ) : (
          <Link href={route.path} key={route.path} className="mt-4 min-w-full first:mt-0">
            {route.name}
          </Link>
        );
      })}
    </div>
  );
}
