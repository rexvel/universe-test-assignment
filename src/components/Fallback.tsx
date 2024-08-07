import React from 'react';

interface ErrorFallbackProps {
  error: Error | null;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div role="alert">
      <h2>Oops! Something went wrong.</h2>
      {error && <pre>{error.message}</pre>}
    </div>
  );
};
