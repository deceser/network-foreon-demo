import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import MarketDetail from '@/pages/app/market-detail/MarketDetail';
import MarketListPage from '@/pages/app/market-list';
import ProposeMarket from '@/pages/app/propose-market/ProposedMarket';
import CreateProposeMarket from '@/pages/app/propose-market/CreateProposeMarket';
import ViewMarketLiquidity from '@/pages/app/view-market-liquidity';
import Root from '@/pages/app/Root';
import { useMarketOrderReturned } from '@/services/queries/useGetStatusOrder';

export default function AppContainer() {
  useMarketOrderReturned();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Root />}>
          <Route
            element={<MarketListPage />}
            path="/markets"
          />
          <Route
            element={<MarketDetail />}
            path="/markets/:id"
          />
          <Route
            element={<ProposeMarket />}
            path="/proposed-market"
          />
          <Route
            element={<CreateProposeMarket />}
            path="/propose-market"
          />
          <Route
            element={<ViewMarketLiquidity />}
            path="/liquidity"
          />
        </Route>

        <Route
          path="/*"
          element={
            <Navigate
              replace
              to="/markets"
            />
          }
        />
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}
