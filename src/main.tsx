import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './styles.css';
import ConfigContextProvider from 'contexts/config-context';
import { RepositoriesContextProvider } from 'contexts/repositories-context';
import Wizard from 'routes/wizard';
import WizardInitWrapper from 'wrappers/wizard-init-wrapper';
import AuthorizationWrapper from 'wrappers/authorization-wrapper';
import Home from './routes/home';
import { PullRequestsContextProvider } from './contexts/pull-requests-context';
import { initPermissions } from './utils/notifications';
import SettingsWindow from './routes/settings-window';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/settings',
    element: <SettingsWindow />,
  },
  {
    path: '/wizard',
    element: <Wizard />,
  },
]);
initPermissions().catch((err) => {
  console.error(err);
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthorizationWrapper>
      <WizardInitWrapper>
        <ConfigContextProvider>
          <RepositoriesContextProvider>
            <PullRequestsContextProvider>
              <RouterProvider router={router} />
            </PullRequestsContextProvider>
          </RepositoriesContextProvider>
        </ConfigContextProvider>
      </WizardInitWrapper>
    </AuthorizationWrapper>
  </React.StrictMode>,
);
