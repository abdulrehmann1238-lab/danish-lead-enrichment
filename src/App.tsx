import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { InitialLoader } from './components/ui/InitialLoader';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/app/DashboardPage';
import { ContactsPage } from './pages/app/ContactsPage';
import { CompaniesPage } from './pages/app/CompaniesPage';
import { ListsPage } from './pages/app/ListsPage';
import { EnrichmentPage } from './pages/app/EnrichmentPage';
import { EnrichmentActivityPage } from './pages/app/EnrichmentActivityPage';
import { CreditWalletPage } from './pages/app/CreditWalletPage';
import { ExportsPage } from './pages/app/ExportsPage';
import { IntegrationsPage } from './pages/app/IntegrationsPage';
import { AnalyticsPage } from './pages/app/AnalyticsPage';
import { BillingPage } from './pages/app/BillingPage';
import { GDPRPage } from './pages/app/GDPRPage';
import { SettingsPage } from './pages/app/SettingsPage';
import { AdminPage } from './pages/app/AdminPage';

export function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <AppProvider>
      {!loaderComplete && (
        <InitialLoader onComplete={() => setLoaderComplete(true)} />
      )}
      <Router>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Authenticated Workspace App Layout */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="lists" element={<ListsPage />} />
            <Route path="enrichment" element={<EnrichmentPage />} />
            <Route path="enrichment-activity" element={<EnrichmentActivityPage />} />
            <Route path="credits" element={<CreditWalletPage />} />
            <Route path="exports" element={<ExportsPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="gdpr" element={<GDPRPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
