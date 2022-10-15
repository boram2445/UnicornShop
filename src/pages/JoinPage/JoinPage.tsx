import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo-hodu.svg";
import JoinForm from "../../components/join/JoinForm/JoinForm";
import * as S from "./joinPageStyle";

function JoinPage() {
  return (
    <S.JoinSection>
      <Link to="/">
        <S.Logo>
          <img src={Logo} alt="유니콘 마켓" />
        </S.Logo>
      </Link>
      <JoinForm />
    </S.JoinSection>
  );
}

export default JoinPage;
