import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';

function App() {

  return (
    <Router>
      <Routes>
        {/* As default it will show login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;