import React from "react";
import { useNavigate } from "react-router-dom";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./orderDoneStyle";

function OrderDone() {
  const navigate = useNavigate();

  return (
    <S.OrderDoneSection>
      <S.PresentImg src={process.env.PUBLIC_URL + "/Imgs/present.png"} alt="" />
      <S.InfoBox>
        <p>주문 완료!</p>
        <small>
          예쁘게 포장해서 보내드릴게요! <br /> 조금만 기다려주세요 :)
        </small>
      </S.InfoBox>
      <S.BtnBox>
        <NormalBtn
          width="11.5rem"
          color="white"
          fontSize="1.5rem"
          padding="0.6rem"
          onClick={() => navigate("/mypage")}
        >
          주문 상세보기
        </NormalBtn>
        <NormalBtn
          color="white"
          width="11.5rem"
          fontSize="1.5rem"
          padding="0.6rem"
          onClick={() => navigate("/")}
        >
          쇼핑 계속하기
        </NormalBtn>
      </S.BtnBox>
    </S.OrderDoneSection>
  );
}

export default OrderDone;
