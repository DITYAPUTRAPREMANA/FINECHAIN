import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="475841752276-if3iv5ql70nhh073ssjr66so8pu9ivd2.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>;
  </React.StrictMode>
)
