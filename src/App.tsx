import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/globalStyle";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import JoinPage from "./pages/JoinPage/JoinPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:productId" element={<DetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
}

export default App;
