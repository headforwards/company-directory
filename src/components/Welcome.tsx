import React from 'react';
import {
  Button,
  Jumbotron } from 'reactstrap';

const WelcomeContent: React.SFC<WelcomeProps> = ({isAuthenticated, user, authButtonMethod}) => {
  // If authenticated, greet the user
  if (isAuthenticated) {
    return (
      <div>
        <h4>Welcome {user.displayName}!</h4>
        <p>Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return <Button color="primary" onClick={authButtonMethod}>Click here to sign in</Button>;
}

interface WelcomeProps {
    isAuthenticated: boolean,
    user: any,
    authButtonMethod?: React.MouseEventHandler<HTMLElement>
}

const Welcome: React.SFC<WelcomeProps> = ({isAuthenticated, user, authButtonMethod}) => {
    return (
      <Jumbotron>
        <h1>React Graph Tutorial</h1>
        <p className="lead">
            This sample app shows how to use the Microsoft Graph API to access Outlook and OneDrive data from React
        </p>
        <WelcomeContent
          isAuthenticated={isAuthenticated}
          user={user}
          authButtonMethod={authButtonMethod} />
      </Jumbotron>
    );
}

export default Welcome