import React from "react";
import { Outlet } from "react-router-dom";
import { Header, CenterHeader } from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import * as S from "./layoutStyle";

function MainLayout() {
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

function CenterLayout() {
  return (
    <>
      <CenterHeader />
      <S.ContentWrap>
        <Outlet />
      </S.ContentWrap>
      <Footer />
    </>
  );
}
export { MainLayout, CenterLayout };
