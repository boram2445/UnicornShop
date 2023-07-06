import React from "react";
import GlobalStyle from "./assets/globalStyle";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import CenterPage from "./pages/CenterPage/CenterPage";
import UploadPage from "./pages/UploadPage/UploadPage";
import MyPage from "./pages/MyPage/MyPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import OrderDonePage from "./pages/OrderDonePage/OrderDone";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<DetailPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/orderDone" element={<OrderDonePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path={"/search/:keyword"} element={<SearchPage />} />
          <Route path="/center" element={<CenterPage />} />
          <Route path="/center/upload" element={<UploadPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
