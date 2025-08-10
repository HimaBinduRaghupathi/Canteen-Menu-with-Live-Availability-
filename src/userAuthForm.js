import { useState } from 'react';

function useAuthForm() {
  const [formType, setFormType] = useState('login');

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  const handleLogin = (email, password) => {
    alert(`Logging in with Email: ${email}, Password: ${password}`);
  };

  const handleRegister = (email, password) => {
    alert(`Registering with Email: ${email}, Password: ${password}`);
  };

  return {
    formType,
    toggleFormType,
    handleLogin,
    handleRegister,
  };
}

export default useAuthForm;