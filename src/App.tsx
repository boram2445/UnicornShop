import React from "react";
import GlobalStyle from "./styles/globalStyle";
import HomePage from "./pages/HomePage/HomePage";

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <HomePage />
    </div>
  );
};

export default App;
