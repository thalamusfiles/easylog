import React from 'react';
import { Navigate, Route } from 'react-router-dom';

//Lazy Loading
const Public = React.lazy(() => import('./public'));

const routes = (
  <>
    <Route path="/public/*" element={<Public />} />

    <Route path="/" element={<Navigate to={'public'} replace />} />
  </>
);

export default routes;
