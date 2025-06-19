import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.scss'
import Template from './layout/main'
import PaymentPage from './pages/PaymentPage'
import HeroDashboard from './sections/hero'
import FinesDashboard from './sections/fines'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Template>
      <BrowserRouter>
        <Routes>
          <Route path="/payments" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
      <HeroDashboard />
      <FinesDashboard />
    </Template>
  </React.StrictMode>
)
