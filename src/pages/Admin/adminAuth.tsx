import React from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function AdminAuth({ onSuccess }: { onSuccess: () => void }) {
  const { route } = useAuthenticator(context => [context.route]);

  // Once signed in, route === 'authenticated'
  if (route === 'authenticated') {
    onSuccess();
    return null;
  }

  return (
    <div className="admin-auth-overlay">
      <Authenticator hideSignUp={true} variation="modal" />
    </div>
  );
}
