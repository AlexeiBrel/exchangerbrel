import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import OperatorPage from './pages/OperatorPage/OperatorPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import AdminPage from './pages/AdminPage/AdminPage';
import { useAuth } from './context';

const App = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const login = localStorage.getItem('login');

  useEffect(() => {
    if (!role) {
      navigate('/register', { replace: true });
    }
  }, [role, navigate]);

  return (
    <Routes>
      {user && role === 'operator' && <Route path='/' element={<OperatorPage />} />}
      {user && role === 'admin' && <Route path='/admin' element={<AdminPage />} />}
      <Route path='/register' element={<RegistrationPage />} />
    </Routes>
  );
};

export default App;
