import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Template from './layout/main'
import PaymentPage from './pages/PaymentPage'
import HeroDashboard from './sections/hero'
import FinesDashboard from './sections/fines'
import TicketPaymentCheckoutPage from './pages/TicketPaymentCheckoutPage'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Template>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroDashboard />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route
            path="/payments/checkout"
            element={<TicketPaymentCheckoutPage />}
          />
          <Route path="/fines" element={<FinesDashboard />} />
        </Routes>
      </BrowserRouter>
    </Template>
  </React.StrictMode>
)
