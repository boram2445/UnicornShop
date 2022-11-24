import React from "react";
import GlobalStyle from "./assets/globalStyle";
import { Routes, Route } from "react-router-dom";
import { MainLayout, CenterLayout } from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CenterPage from "./pages/CenterPage/CenterPage";
import UploadPage from "./pages/UploadPage/UploadPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<DetailPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
        <Route element={<CenterLayout />}>
          <Route path="/center" element={<CenterPage />} />
          <Route path="/center/upload" element={<UploadPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </>
  );
}

export default App;
