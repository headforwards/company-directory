import React from 'react';
import { Alert } from 'reactstrap';

export interface ErrorMessageProps {
  // error: {
    message: string,
    debugProp?: string
  // }
}

const ErrorMessage: React.SFC<ErrorMessageProps> = ({ message, debugProp }) => {
  let debug = null;
  if (debugProp) {
    debug = <pre className="alert-pre border bg-light p-2"><code>{debugProp}</code></pre>;
  }
  return (
    <Alert color="danger">
      <p className="mb-3">{message}</p>
      {debug}
    </Alert>
  );
}

export default ErrorMessage