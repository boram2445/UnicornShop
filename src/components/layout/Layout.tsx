import React from "react";
import { Outlet } from "react-router-dom";
import { Header, CenterHeader } from "../common/Header/Header";
import Footer from "../common/Footer/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function CenterLayout() {
  return (
    <>
      <CenterHeader />
      <Outlet />
      <Footer />
    </>
  );
}
export { MainLayout, CenterLayout };
