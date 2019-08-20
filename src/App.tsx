import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar/NavBar';
import ErrorMessage, { ErrorMessageProps } from './components/ErrorMessage';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.SFC = () => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState<ErrorMessageProps | null>(null)
  //const [user, setUser] = React.useState<IUser | null>(initialUserData);
  let errorMessage = null;
  if (error) {
    errorMessage = <ErrorMessage message={error.message} debugProp={error.debugProp} />;
  }

  function empty() {
    
  }
  return (
    <Router>
      <div>
        <NavBar
          isAuthenticated={isAuthenticated}
          authButtonMethod={empty}
          user={user} />
        <Container>
          {ErrorMessage}
          <Route exact path="/"
            render={(props) =>
              <Welcome {...props}
                isAuthenticated={isAuthenticated}
                user={user}
              />
            } />
        </Container>
      </div>
    </Router>
  );
  function setErrorMessage(message: string, debug: string) {
    setError({ message: message, debugProp: debug 
    });
  }
}

export default App;