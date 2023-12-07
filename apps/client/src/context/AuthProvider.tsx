import { createContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppState,
  Auth0Provider,
  useAuth0,
  AuthorizationParams,
} from '@auth0/auth0-react';

import envConfig from 'config/env.config';

interface FCProps {
  children: React.ReactNode;
}

interface IContext {
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin(): Promise<void>;
  handleLogout(): void;
  handleSignUp(): Promise<void>;
  getToken(): Promise<{ Authorization: string }>;
}

const authorizationParams: AuthorizationParams = {
  redirect_uri: envConfig.AUTH0.CALLBACK_URL,
  audience: envConfig.AUTH0.AUDIENCE,
};

export const AuthContext = createContext<IContext>(null!);

const APP_STATE = {
  returnTo: '/w',
};

const AuthProvider = ({ children }: FCProps) => {
  const {
    isLoading,
    loginWithRedirect,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const getToken = useCallback(async () => {
    const token = await getAccessTokenSilently();
    return { Authorization: `Bearer ${token}` };
  }, [getAccessTokenSilently]);

  const handleLogin = useCallback(async () => {
    await loginWithRedirect({
      appState: APP_STATE,
    });
  }, [loginWithRedirect]);

  const handleLogout = useCallback(() => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }, [logout]);

  const handleSignUp = useCallback(async () => {
    await loginWithRedirect({
      appState: APP_STATE,
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }, [loginWithRedirect]);

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated,
      handleLogin,
      handleLogout,
      handleSignUp,
      getToken,
    }),
    [
      isLoading,
      isAuthenticated,
      getToken,
      handleLogin,
      handleLogout,
      handleSignUp,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const Auth0ProviderWithNavigate = ({ children }: FCProps) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo ?? window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={envConfig.AUTH0.DOMAIN}
      clientId={envConfig.AUTH0.CLIENT_ID}
      authorizationParams={authorizationParams}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthProvider>{children}</AuthProvider>
    </Auth0Provider>
  );
};
