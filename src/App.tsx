import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login/loginPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/signup" element={ <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;