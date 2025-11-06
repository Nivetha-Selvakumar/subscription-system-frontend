import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';
import AdminIndex from './components/adminModule';
import AdminUsers from './components/adminModule/adminUsers/AdminUsers';
import AdminPlan from './components/adminModule/adminPlanDetails/AdminPlan';
import AdminPayment from './components/adminModule/adminPayment/AdminPayment';
import AdminSupportTicket from './components/adminModule/adminSupportTicket/AdminSupportTicktet';
import AdminHelpAndFeedback from './components/adminModule/adminHelpAndFeedback/AdminHelpAndFeedback';

function App() {

  return (
    <Router>
      <Routes>
        {/* As default it will show login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Module */}
        <Route path="/admin/dashboard" element={<AdminIndex />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/plans" element={<AdminPlan />} />
        <Route path="/admin/payments" element={<AdminPayment />} />
        <Route path="/admin/adminSupportTicket" element={<AdminSupportTicket />} />
        <Route path="/admin/helpAndFeedback" element={<AdminHelpAndFeedback />} />

        {/* User Module */}
        <Route path="/dashboard" element={<AdminIndex />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;