import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
