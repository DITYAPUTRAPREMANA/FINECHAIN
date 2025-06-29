import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Template from './layout/main'
import PaymentPage from './pages/PaymentPage'
import PaymentHistoryPage from './pages/PaymentHistoryPage'
import HeroDashboard from './components/dashboard/hero'
import FinesPage from './pages/FinesPage'
import TicketPaymentCheckoutPage from './pages/TicketPaymentCheckoutPage'
import PaymentHistoryDetail from './pages/PaymentHistoryDetail'
import FeatureDashboard from './components/dashboard/features'
import DashboardPage from './pages/DashboardPage'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Template>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/fines" element={<FinesPage />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/history" element={<PaymentHistoryPage />} />
          <Route
            path="/history-detail/:id"
            element={<PaymentHistoryDetail />}
          />
          <Route
            path="/payments/checkout/:ticketNumber"
            element={<TicketPaymentCheckoutPage />}
          />
        </Routes>
      </Template>
    </BrowserRouter>
  </React.StrictMode>
)
