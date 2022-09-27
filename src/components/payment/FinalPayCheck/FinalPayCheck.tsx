import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./finalPayCheckStyle";

function FinalPayCheck() {
  return (
    <S.FinalPaySection>
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
          <S.LabelBox>
            <S.CheckBox type="checkbox" id="check"></S.CheckBox>
            <S.LabelText htmlFor="check">
              주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
            </S.LabelText>
          </S.LabelBox>
          <NormalBtn size="large" disabled={true}>
            결제하기
          </NormalBtn>
        </S.BottomWrap>
      </S.BoxWrap>
    </S.FinalPaySection>
  );
}

export default FinalPayCheck;
