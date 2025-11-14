import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';
import AdminIndex from './components/adminModule';
import AdminUsers from './components/adminModule/adminUsers/AdminUsers';
import AdminPlan from './components/adminModule/adminPlanDetails/AdminPlan';
import AdminAddPlan from './components/adminModule/adminPlanDetails/AdminAddPlan';
import AdminPayment from './components/adminModule/adminPayment/AdminPayment';
import AdminSupportTicket from './components/adminModule/adminSupportTicket/AdminSupportTicktet';
import AdminFeedback from './components/adminModule/adminFeedback/AdminFeedback';
import AdminAddUser from './components/adminModule/adminUsers/AdminAddUser';
import AdminViewUser from './components/adminModule/adminUsers/AdminViewUser';
import AdminEditUser from './components/adminModule/adminUsers/AdminEditUser';
import AdminEditPlan from './components/adminModule/adminPlanDetails/AdminEditPlan';
import AdminViewPlan from './components/adminModule/adminPlanDetails/AdminViewPlan';
import UserDashboard from './components/userModule/userDashboard/UserDashboard';
import UserPayments from './components/userModule/userPayments/UserPayments';
import UserPlanDetails from './components/userModule/userPlanDetails/UserPlanDetails';
import UserProfile from './components/userModule/userProfile/UserProfile';
import UserSupportTicket from './components/userModule/userSupportTicket/UserSupportTicket';
import UserProfileEdit from './components/userModule/userProfile/UserProfileEdit';
import UserFeedback from './components/userModule/userFeedback/UserFeedback';
import AdminFeedbackView from './components/adminModule/adminFeedback/AdminFeedbackView';
import UserFeedbackView from './components/userModule/userFeedback/UserFeedbackView';

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
        <Route path="/admin/feedback" element={<AdminFeedback />} />

        <Route path="/admin/create/user" element={<AdminAddUser />} />
        <Route path="/admin/users/view/:id" element={<AdminViewUser />} />
        <Route path="/admin/users/edit/:id" element={<AdminEditUser />} />

        <Route path="/admin/create/plan" element={<AdminAddPlan />} />
        <Route path="/admin/plans/edit/:id" element={<AdminEditPlan />} />
        <Route path="/admin/plans/view/:id" element={<AdminViewPlan />} />


        {/* User Module */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/plans" element={<UserPlanDetails />} />
        <Route path="/user/payments" element={<UserPayments />} />
        <Route path="/user/supportTicket" element={<UserSupportTicket />} />
        <Route path="/user/feedback" element={<UserFeedback />} />

        {/*Feedback  */}
        <Route path="/admin/feedback/view/:id" element={<AdminFeedbackView />} />
        <Route path="/user/feedback/list" element={<UserFeedbackView />} />

        <Route path="/user/profile/edit" element={<UserProfileEdit />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;