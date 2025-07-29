import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './conponents/Layout';
import MainPage from './conponents/pages/MainPage';
import Dashboard from './conponents/Dashboard';
import Signin from './conponents/pages/Signin';
import Signup from './conponents/pages/Signup';
import Overview from './conponents/pages/Overview';
import Pricing from './conponents/pages/Pricing';
import Demo from './conponents/pages/Demo';
import DashboardOverview from './conponents/pages/DashboardOverview';
import DashboardSettings from './conponents/pages/DashboardSettings';
import DashboardIntegrations from './conponents/pages/DashboardIntegrations';
import DashboardUsage from './conponents/pages/DashboardUsage';
import AboutPage from './conponents/pages/AboutPage';
import ContactPage from './conponents/pages/ContactPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="overview" element={<Overview />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="demo" element={<Demo />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="integrations" element={<DashboardIntegrations />} />
          <Route path="usage" element={<DashboardUsage />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
