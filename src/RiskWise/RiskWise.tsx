
import React from 'react';
import { Navigate } from 'react-router-dom';

const RiskWise = () => {
  // Simply redirect to the new home page
  return <Navigate to="/" replace />;
};

export default RiskWise;