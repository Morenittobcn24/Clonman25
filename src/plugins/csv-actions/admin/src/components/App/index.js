import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from '@strapi/helper-plugin';
import HomePage from './pages/App';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
};

export default App;