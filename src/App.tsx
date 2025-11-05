import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';
import AdminDashboard from './components/adminModule';

function App() {

  return (
    <Router>
      <Routes>
        {/* As default it will show login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Module */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* User Module */}
        <Route path="/dashboard" element={<AdminDashboard />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;