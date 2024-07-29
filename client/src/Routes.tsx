import { Routes as BrowserRouter, Route } from 'react-router-dom';

import * as Pages from './pages';
import { Auth, Dashboard } from './layouts';
import { PrivateRoute, PrivateRole } from './components';

const Routes = () => {
  return (
    <BrowserRouter>
      {/* auth pages */}
      <Route element={<Auth />}>
        <Route path="sign-up" element={<Pages.SignUp />} />
        <Route path="sign-in" element={<Pages.SignIn />} />
        <Route path="forgot-password" element={<Pages.ForgotPassword />} />
      </Route>

      {/* dashboard page */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.Home />
            </PrivateRole>
          }
        />

        <Route
          path="sales-transactions"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.SalesTransaction />
            </PrivateRole>
          }
        />
        <Route
          path="purchase-orders"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.PurchaseOrders />
            </PrivateRole>
          }
        />

        <Route
          path="sales-transactions"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.SalesTransaction />
            </PrivateRole>
          }
        />
        <Route
          path="purchase-transactions"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.PurchaseTransactions />
            </PrivateRole>
          }
        />

        <Route
          path="categories"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.Categories />
            </PrivateRole>
          }
        />
        <Route
          path="units"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.Units />
            </PrivateRole>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.Products />
            </PrivateRole>
          }
        />
        <Route
          path="customers"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.Customers />
            </PrivateRole>
          }
        />
        <Route
          path="suppliers"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.Suppliers />
            </PrivateRole>
          }
        />
        <Route
          path="employe"
          element={
            <PrivateRole roles={['OWNER']}>
              <Pages.Employe />
            </PrivateRole>
          }
        />

        <Route
          path="user-settings"
          element={
            <PrivateRole roles={['OWNER', 'ADMIN']}>
              <Pages.UserSettings />
            </PrivateRole>
          }
        />
      </Route>

      <Route
        path="sales-orders"
        element={
          <PrivateRoute>
            <Pages.SalesOrders />
          </PrivateRoute>
        }
      />
      <Route
        path="shops"
        element={
          <PrivateRoute>
            <PrivateRole roles={['OWNER']}>
              <Pages.Shops />
            </PrivateRole>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Pages.ErrorPage />} />
    </BrowserRouter>
  );
};

export default Routes;
