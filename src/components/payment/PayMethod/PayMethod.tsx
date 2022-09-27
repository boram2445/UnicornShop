import React from "react";
import * as S from "./payMethodStyle";

function PayMethod() {
  return (
    <S.PayMentSection>
      <S.Title>결제 수단</S.Title>
      <S.PayMentForm>
        <S.InputWrap>
          <S.CircleInput type="radio" id="card" name="payMethod" />
          <S.Label htmlFor="card">신용/체크카드</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="bankTransfer" name="payMethod" />
          <S.Label htmlFor="bankTransfer">무통장 입금</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="phone" name="payMethod" />
          <S.Label htmlFor="phone">휴대폰 결제</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="naverPay" name="payMethod" />
          <S.Label htmlFor="naverPay">네이버페이</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="kakaoPay" name="payMethod" />
          <S.Label htmlFor="kakaoPay">카카오페이</S.Label>
        </S.InputWrap>
      </S.PayMentForm>
    </S.PayMentSection>
  );
}

export default PayMethod;
