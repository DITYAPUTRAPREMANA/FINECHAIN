import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import Template from './layout/main'
import HeroDashboard from './sections/hero'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Template>
        <div></div>
    </Template>
  </React.StrictMode>
)
