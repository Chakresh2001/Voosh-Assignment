import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('userToken', token); 
      navigate('/home'); 
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Logging you in...</h2>
    </div>
  );
};
