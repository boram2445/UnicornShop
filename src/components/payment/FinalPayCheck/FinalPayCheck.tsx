import React from "react";
import { selectDeliveryPrice, selectTotalPrice } from "../../../features/orderSlice";
import { useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import CheckLabel from "../../common/CheckLabel/CheckLabel";
import * as S from "./finalPayCheckStyle";

interface FinalCheckProps {
  canOrder: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FinalPayCheck({ canOrder, onChange }: FinalCheckProps) {
  const totalPrice = useAppSelector(selectTotalPrice);
  const deliveryPrice = useAppSelector(selectDeliveryPrice);
  return (
    <S.FinalPaySection>
      <S.Title>최종결제 정보</S.Title>
      <S.BoxWrap>
        <S.TopWrap>
          <S.PayRow>
            <S.PayText>상품금액</S.PayText>
            <S.MoneyCount>
              {totalPrice.toLocaleString()}
              <span>원</span>
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
              {deliveryPrice.toLocaleString()}
              <span>원</span>
            </S.MoneyCount>
          </S.PayRow>
          <S.TotalMoneyBox>
            <S.PayText>결제금액</S.PayText>
            <S.TotalMoneyCount>
              {(totalPrice + deliveryPrice).toLocaleString()}
              <span>원</span>
            </S.TotalMoneyCount>
          </S.TotalMoneyBox>
        </S.TopWrap>
        <S.BottomWrap>
          <CheckLabel onChange={onChange}>
            주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </CheckLabel>
          <NormalBtn size="large" disabled={!canOrder}>
            결제하기
          </NormalBtn>
        </S.BottomWrap>
      </S.BoxWrap>
    </S.FinalPaySection>
  );
}

export default FinalPayCheck;
