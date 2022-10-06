import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo-hodu.svg";
import JoinForm from "../../components/join/JoinForm/JoinForm";
import * as S from "./joinPageStyle";

function JoinPage() {
  return (
    <div>
      <Link to="/">
        <S.Logo>
          <img src={Logo} />
        </S.Logo>
      </Link>
      <JoinForm />
    </div>
  );
}

export default JoinPage;
