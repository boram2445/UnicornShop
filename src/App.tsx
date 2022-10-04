import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/globalStyle";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
