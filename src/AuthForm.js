import React, { useState } from 'react';
import useAuthForm from './useAuthForm';

function AuthForm() {
  const { formType, toggleFormType, handleLogin, handleRegister } = useAuthForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'login') {
      handleLogin(email, password);
    } else {
      handleRegister(email, password);
    }
  };

  return (
    <div className="auth-container">
      <h2>{formType === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{formType === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={toggleFormType} style={{ cursor: 'pointer', marginTop: '10px' }}>
        {formType === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default AuthForm;
