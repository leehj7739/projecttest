import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './conponents/Layout';
import MainPage from './conponents/mainpage';
import Dashboard from './conponents/Dashboard';
import Signin from './conponents/Signin';
import Signup from './conponents/Signup';
import Overview from './conponents/Overview';
import Pricing from './conponents/Pricing';
import Demo from './conponents/Demo';
import DashboardOverview from './conponents/DashboardOverview';
import DashboardSettings from './conponents/DashboardSettings';
import DashboardIntegrations from './conponents/DashboardIntegrations';
import DashboardUsage from './conponents/DashboardUsage';
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
