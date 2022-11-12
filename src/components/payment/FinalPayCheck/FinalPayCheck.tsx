import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import CheckLabel from "../../common/CheckLabel/CheckLabel";
import * as S from "./finalPayCheckStyle";

function FinalPayCheck() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <S.FinalPayForm onSubmit={handleSubmit}>
      <S.Title>최종결제 정보</S.Title>
      <S.BoxWrap>
        <S.TopWrap>
          <S.PayRow>
            <S.PayText>상품금액</S.PayText>
            <S.MoneyCount>
              46,500<span>원</span>
            </S.MoneyCount>
          </S.PayRow>
          <S.PayRow>
            <S.PayText>할인금액</S.PayText>
            <S.MoneyCount>
              0<span>원</span>
            </S.MoneyCount>
          </S.PayRow>
          <S.PayRow>
            <S.PayText>배송비</S.PayText>
            <S.MoneyCount>
              0<span>원</span>
            </S.MoneyCount>
          </S.PayRow>
          <S.TotalMoneyBox>
            <S.PayText>결제금액</S.PayText>
            <S.TotalMoneyCount>
              46,500<span>원</span>
            </S.TotalMoneyCount>
          </S.TotalMoneyBox>
        </S.TopWrap>
        <S.BottomWrap>
          <CheckLabel>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</CheckLabel>
          <NormalBtn size="large">결제하기</NormalBtn>
        </S.BottomWrap>
      </S.BoxWrap>
    </S.FinalPayForm>
  );
}

export default FinalPayCheck;
