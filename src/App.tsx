import React, { Component, useState } from 'react';
import config from './Config'
import { UserAgentApplication } from 'msal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar/NavBar';
import ErrorMessage, { ErrorMessageProps } from './components/ErrorMessage';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.css';
import { logicalExpression } from '@babel/types';

const App: React.SFC = () => {

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: config.appId
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  });

  let signedInUser = userAgentApplication.getAccount();

  const [isAuthenticated, setAuthenticated] = useState(signedInUser !== null)
  const [user, setUser] = useState({})
  const [error, setError] = useState<ErrorMessageProps | null>(null)

  let errorMessage = null;
  if (error) {
    errorMessage = <ErrorMessage message={error.message} debugProp={error.debugProp} />;
  }

  async function login() {
    try {
      await userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        });
      await getUserProfile();
    }
    catch (err) {
      var errParts = err.split('|');
      setAuthenticated(false)
      setError({ message: errParts[1], debugProp: errParts[0] })
      setUser({})
    }
  }

  async function logout() {
    userAgentApplication.logout()
  }

  async function getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var accessToken = await userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });

      if (accessToken) {
        // TEMPORARY: Display the token in the error flash
        setAuthenticated(true)
        setError({ message: "Access token:", debugProp: accessToken.accessToken })
      }
    }
    catch (err) {
      var errParts = err.split('|');
      setAuthenticated(false)
      setError({ message: errParts[1], debugProp: errParts[0] })
      setUser({})
    }
  }

  return (
    <Router>
      <div>
        <NavBar
          isAuthenticated={isAuthenticated}
          authButtonMethod={isAuthenticated ? logout : login}
          user={user} />
        <Container>
          {errorMessage}
          <Route exact path="/"
            render={(props) =>
              <Welcome {...props}
                isAuthenticated={isAuthenticated}
                user={user}
                authButtonMethod={login}
              />
            } />
        </Container>
      </div>
    </Router>
  );
  function setErrorMessage(message: string, debug: string) {
    setError({
      message: message, debugProp: debug
    });
  }
}

export default App;