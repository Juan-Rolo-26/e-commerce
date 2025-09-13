import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, RequireAuth } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/product/:id"
            element={
              <RequireAuth>
                <ProductDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
