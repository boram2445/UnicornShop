import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo-hodu.svg";
import { NormalBtn } from "../../components/common/Button/Button";
import CheckLabel from "../../components/common/CheckLabel/CheckLabel";
import JoinForm from "../../components/join/JoinForm/JoinForm";
import * as S from "./joinPageStyle";

function JoinPage() {
  return (
    <S.JoinSection>
      <Link to="/">
        <S.Logo>
          <img src={Logo} />
        </S.Logo>
      </Link>
      <JoinForm />
      <CheckLabel color="#767676">
        유니콘샵의 <u>이용약관</u> 및 <u>개인정보처리방침</u>에 대한 내용을 확인하였고 동의합니다.
      </CheckLabel>
      <NormalBtn size="medium" disabled={true}>
        가입하기
      </NormalBtn>
    </S.JoinSection>
  );
}

export default JoinPage;
