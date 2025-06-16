import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from 'declarations/hackathon_backend';
import { canisterId } from 'declarations/hackathon_backend/index.js';

// Define types for the state
interface AppState {
  actor: any;  // Replace with the actual type of the actor if available
  authClient: AuthClient | undefined;
  isAuthenticated: boolean;
  principal: string;
}

const network = import.meta.env.VITE_DFX_NETWORK;

const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

// Reusable button component with typed props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors ${className}`}
    {...props} // Spread the other button props like type, disabled, etc.
  >
    {children}
  </button>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID',
  });

  // Initialize auth client
  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev) => ({
      ...prev,
      actor,
      authClient,
      isAuthenticated,
    }));
  };

  const login = async () => {
    await state.authClient?.login({
      identityProvider,
      onSuccess: updateActor,
    });
  };

  const logout = async () => {
    await state.authClient?.logout();
    updateActor();
  };

  const whoami = async () => {
    setState((prev) => ({
      ...prev,
      principal: 'Loading...',
    }));

    if (state.actor) {
      const result = await state.actor.whoami();
      const principal = result.toString();
      setState((prev) => ({
        ...prev,
        principal,
      }));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Who Am I?</h1>
      <div id="info-box" className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
        <div className="info-content text-sm text-gray-700">
          <p>
            <i className="fas fa-info-circle"></i> A <strong>principal</strong> is a unique identifier in the Internet
            Computer ecosystem.
          </p>
          <p>
            It represents an entity (user, canister smart contract, or other) and is used for identification and
            authorization purposes.
          </p>
          <p>
            In this example, click "Whoami" to find out the principal ID with which you're interacting with the backend.
            If you're not signed in, you will see that you're using the so-called anonymous principal, "2vxsx-fae".
          </p>
          <p>
            After you've logged in with Internet Identity, you'll see a longer principal, which is unique to your
            identity and the dapp you're using.
          </p>
        </div>
      </div>

      {!state.isAuthenticated ? (
        <Button onClick={login}>Login with Internet Identity</Button>
      ) : (
        <Button onClick={logout}>Logout</Button>
      )}

      <Button onClick={whoami} className="mt-4">
        Whoami
      </Button>

      {state.principal && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Your principal ID is:</h2>
          <h4 className="text-lg text-blue-600">{state.principal}</h4>
        </div>
      )}
    </div>
  );
};

export default App;
