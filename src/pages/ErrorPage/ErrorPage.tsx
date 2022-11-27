import React from "react";
import { useNavigate } from "react-router-dom";
import Icon404 from "../../assets/icons/icon-404.svg";
import { NormalBtn } from "../../components/common/Button/Button";
import * as S from "./errorPageStyle";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <S.ErrorSection>
      <img src={Icon404} />
      <S.RightWrap>
        <S.Title>페이지를 찾을 수 없습니다. </S.Title>
        <S.DescribeText>
          페이지가 존재하지 않거나 사용할 수 없는 페이지 입니다. <br /> 웹 주소가 올바른지 확인해
          주세요.
        </S.DescribeText>
        <S.BtnWrap>
          <NormalBtn width="200px" padding="18px 0" onClick={() => navigate("/")}>
            메인으로
          </NormalBtn>
          <NormalBtn width="200px" padding="18px 0" color="white" onClick={() => navigate(-1)}>
            이전 페이지
          </NormalBtn>
        </S.BtnWrap>
      </S.RightWrap>
    </S.ErrorSection>
  );
}

export default ErrorPage;
