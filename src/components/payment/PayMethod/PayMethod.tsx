import React from "react";
import * as S from "./payMethodStyle";

type PayMethodProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PayMethod({ onChange }: PayMethodProps) {
  return (
    <S.PayMentSection>
      <S.Title>결제 수단</S.Title>
      <S.PayMentBox>
        <S.InputWrap>
          <S.CircleInput type="radio" id="CARD" name="payMethod" onChange={onChange} />
          <S.Label htmlFor="CARD">신용/체크카드</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="DEPOSIT" name="payMethod" onChange={onChange} />
          <S.Label htmlFor="DEPOSIT">무통장 입금</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="PHONE_PAYMENT" name="payMethod" onChange={onChange} />
          <S.Label htmlFor="PHONE_PAYMENT">휴대폰 결제</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="NAVERPAY" name="payMethod" onChange={onChange} />
          <S.Label htmlFor="NAVERPAY">네이버페이</S.Label>
        </S.InputWrap>
        <S.InputWrap>
          <S.CircleInput type="radio" id="KAKAOPAY" name="payMethod" onChange={onChange} />
          <S.Label htmlFor="KAKAOPAY">카카오페이</S.Label>
        </S.InputWrap>
      </S.PayMentBox>
    </S.PayMentSection>
  );
}

export default PayMethod;
