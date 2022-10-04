import React from "react";
import LoginForm from "../../components/login/LoginForm/LoginForm";
import Logo from "../../assets/icons/Logo-hodu.svg";
import { Link } from "react-router-dom";
import * as S from "./loginPageStyle";

function LoginPage() {
  return (
    <S.LoginSection>
      <Link to="/">
        <S.Logo>
          <img src={Logo} />
        </S.Logo>
      </Link>
      <LoginForm />
      <S.LinkBox>
        <Link to="/">
          <span>회원가입</span>
        </Link>
        <Link to="/">
          <span>비밀번호 찾기</span>
        </Link>
      </S.LinkBox>
    </S.LoginSection>
  );
}

export default LoginPage;
