import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import * as S from "./layoutStyle";

function Layout() {
  return (
    <>
      <Header />
      <S.ContentWrap>
        <Outlet />
      </S.ContentWrap>
      <Footer />
    </>
  );
}

export default Layout;
