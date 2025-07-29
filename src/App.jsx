import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './conponents/ThemeProvider';
import AuthProvider from './conponents/AuthProvider';
import ProtectedRoute from './conponents/ProtectedRoute';
import Layout from './conponents/Layout';
import MainPage from './conponents/pages/MainPage';
import Dashboard from './conponents/Dashboard';
import Signin from './conponents/pages/Signin';
import Signup from './conponents/pages/Signup';
import Overview from './conponents/pages/Overview';
import Pricing from './conponents/pages/Pricing';
import Demo from './conponents/pages/Demo';
import FontTest from './conponents/pages/FontTest';
import DashboardOverview from './conponents/pages/DashboardOverview';
import DashboardSettings from './conponents/pages/DashboardSettings';
import DashboardUsage from './conponents/pages/DashboardUsage';
import DashboardBilling from './conponents/pages/DashboardBilling';
import DashboardApp from './conponents/pages/DashboardApp';
import AboutPage from './conponents/pages/AboutPage';
import ContactPage from './conponents/pages/ContactPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="overview" element={<Overview />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="demo" element={<Demo />} />
              <Route path="font-test" element={<FontTest />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="usage" element={<DashboardUsage />} />
              <Route path="billing" element={<DashboardBilling />} />
              <Route path="app" element={<DashboardApp />} />
            </Route>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
