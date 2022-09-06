import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
