import React from "react";
import GlobalStyle from "./styles/globalStyle";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
