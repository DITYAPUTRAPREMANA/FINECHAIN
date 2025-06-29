import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from "react-router";

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

    const navigate = useNavigate();

    const [state, setState] = useState<AppState>({
        actor: undefined,
        authClient: undefined,
        isAuthenticated: false,
        principal: 'Click "Whoami" to see your principal ID',
    });

    // Initialize auth client
    useEffect(() => {
        logout();
        updateActor();
    }, []);

    const updateActor = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        const isAuthenticated = await authClient.isAuthenticated();

        const principalId = identity.getPrincipal().toText();

        localStorage.setItem("userId", principalId);

        setState((prev) => ({
            ...prev,
            authClient,
            isAuthenticated,
            principalId,
        }));
    };

    const login = async () => {
        await state.authClient?.login({
            identityProvider,
            onSuccess: () => { updateActor(), navigate("/") },
        });
    };

    const logout = async () => {
        await state.authClient?.logout();
        localStorage.removeItem("userId");
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

        <div className="py-20 z-30 w-full h-full">
            <div className="bg-gray/60 backdrop-blur-2xl p-8 rounded-[48px] shadow-xl w-[600px] h-[600px] mx-auto border-2 border-gray-500/40 flex flex-col">
                <div className="mb-25   flex justify-start">
                    <img src="/images/logo.png" alt="Logo" className="w-60" />
                </div>

                <h1 className="text-[60px] font-bold text-left text-[#145374] mb-6" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
                    Login With Internet Identity
                </h1>

                <div className="mb-30 text-center">
                    <Button onClick={login}>Login</Button>
                </div>
            </div>


            {state.principal && (
                <div className="mt-6 text-center">
                </div>
            )}
        </div>

    );
};

export default App;