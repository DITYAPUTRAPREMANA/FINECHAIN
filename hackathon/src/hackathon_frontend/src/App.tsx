import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from 'declarations/hackathon_backend';
import { canisterId } from 'declarations/hackathon_backend/index.js';
import Logo from 'hackathon_frontend/asset/logo.png'; 
import GoogleLogo from 'hackathon_frontend/asset/google.png';
import { useGoogleLogin } from '@react-oauth/google';

interface AppState {
  actor: any;
  authClient: AuthClient | undefined;
  isAuthenticated: boolean;
  principal: string;
}

const network = import.meta.env.VITE_DFX_NETWORK;

const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`px-57 py-2.5 bg-gradient-to-r from-[#FFFFFF] via-[#F4D06F] to-[#FF8811] text-[#145374] font-semibold rounded-[100px] shadow-sm hover:opacity-70 border-1 border-[#145374] hover:border-white transition-all hover:shadow-lg hover:text-[#FF8811] hover:shadow-[#FFEFC3]`}
    style={{  
      background: 'linear-gradient(90deg, #FFFFFF 20%, #F4D06F 81%, #FF8811 98%)',
    }}
    {...props} 
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

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
<div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
  <div className="fixed w-[345px] h-[355px] bg-[#9DD9D2] blur-[110px] left-44 top-12 z-10 soft-bounce"></div>
  <div className="fixed w-[190px] h-[190px] bg-[#F4D06F] blur-[80px] right-0 top-0 z-10 soft-bounce"></div>
  <div className="fixed w-[480px] h-[480px] bg-[#145374] blur-[132px] right-52 top-60 z-10 soft-bounce"></div>
  <div className="fixed w-[480px] h-[480px] bg-[#F81] blur-[156px] -left-[220px] top-[480px] z-10 soft-bounce"></div>

  <main className="relative max-w-[1728px] w-full flex z-10">
    <div className="pt-20 z-30 w-full h-full">
      <div className="bg-gray/50 backdrop-blur-lg p-8 rounded-[48px] shadow-xl w-[600px] h-[700px] mx-auto border-2 border-white/30 flex flex-col">
        <div className="mb-10   flex justify-start">
          <img src={Logo} alt="Logo" className="w-60" />
        </div>

        <h1 className="text-[60px] font-bold text-left text-[#145374] mb-6" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
          Login With Internet Identity
        </h1>

        <div className="mb-30 text-center">
          <Button onClick={login}>Login</Button>
        </div>

        <h1 className="text-[20px] font-bold text-left text-[#145374] mb-6" style={{ fontFamily: 'roboto, Arial, sans-serif' }}>
          Continue With Another Account?
        </h1>

        <div className="mb-10 text-center">
          <Button
            onClick={() => googleLogin()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', width: '100%', height: '55px', justifyContent: 'center' }}
          >
            <img src={GoogleLogo} alt="Google logo" style={{ width: 34, height: 34 }} />
            Google
          </Button>
        </div>
      </div>
      

      {state.principal && (
        <div className="mt-6 text-center">
        </div>
      )}
    </div>
  </main>
</div>

  );
};

export default App;
