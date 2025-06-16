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
    className={`px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-600 transition-all ${className}`}
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
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      {/* Background Design */}
      <div className="fixed w-[345px] h-[355px] bg-[#9DD9D2] blur-[110px] left-44 top-12 z-10 soft-bounce"></div>
      <div className="fixed w-[190px] h-[190px] bg-[#F4D06F] blur-[80px] right-0 top-0 z-10 soft-bounce"></div>
      <div className="fixed w-[480px] h-[480px] bg-[#145374] blur-[132px] right-52 top-60 z-10 soft-bounce"></div>
      <div className="fixed w-[480px] h-[480px] bg-[#F81] blur-[156px] -left-[220px] top-[480px] z-10 soft-bounce"></div>

      <main className="relative max-w-[1728px] w-full flex z-10">
        <div className="pt-20 z-30 w-full h-full">
          {/* Glassmorphism Card with custom size (W: 700px, H: 774px) */}
         <div className="bg-[]/50 backdrop-blur-lg p-8 rounded-[24px] shadow-xl w-[500px] h-[600px] mx-auto border border-white/80">
  <h1
    className="text-[40px] font-bold text-left text-[#145374] mb-6"
    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
  >
    Login with Internet Identity
  </h1>
  <div className="mb-4 text-center">
    <Button onClick={login}>Login</Button>
  </div>
</div>

          {state.principal && (
            <div className="mt-6 text-center">
              {/* Optionally show principal */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
