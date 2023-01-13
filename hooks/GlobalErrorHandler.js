import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { sendErrorToServer, sendNotification } from "./error-utils";
import { ProvideAuth } from "./auth";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // handle the error here, for example, by displaying an error message to the user
  sendErrorToServer(error);
  sendNotification(error);
  return (
    <div>
      <p>An error has occurred: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

function GlobalErrorHandler({ children }) {
  useEffect(() => {
    // setup global error handling here, for example, by logging the error
    const originalError = console.error;
    console.error = (...args) => {
      originalError(...args);
    };
  }, []);

  return (
    <ErrorBoundary fallback={ErrorFallback} onReset={() => {}}>
      <ProvideAuth>{children}</ProvideAuth>
    </ErrorBoundary>
  );
}

export default GlobalErrorHandler;
