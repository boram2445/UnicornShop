import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getAuthState } from "../../features/loginSlice";
import LoginForm from "../../components/login/LoginForm/LoginForm";
import Spinner from "../../components/common/Spinner/Spinner";
import Logo from "../../assets/icons/logo-unicorn.svg";
import * as S from "./loginPageStyle";

function LoginPage() {
  const { status } = useAppSelector(getAuthState);

  return (
    <S.LoginSection>
      <Link to="/">
        <S.Logo>
          <img src={Logo} alt="유니콘 마켓" />
        </S.Logo>
      </Link>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <LoginForm />
          <S.LinkBox>
            <Link to="/">
              <span>홈으로</span>
            </Link>
            <Link to="/join">
              <span>회원가입</span>
            </Link>
          </S.LinkBox>
        </>
      )}
    </S.LoginSection>
  );
}

export default LoginPage;
