import React from "react";
import * as S from "./totalPriceStyle";
import { useAppSelector } from "../../../hooks";
import { selectTotalPrice } from "../../../reducers/cartListSlice";

function TotalPrice() {
  const totalPrice = useAppSelector(selectTotalPrice);
  return (
    <S.TotalPriceBox>
      <S.PriceBox>
        <S.TitleText>총 상품 금액</S.TitleText>
        <S.ResultText>
          {totalPrice.toLocaleString()}
          <span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.PriceBox>
        <S.TitleText>상품 할인</S.TitleText>
        <S.ResultText>
          0<span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.PriceBox>
        <S.TitleText>배송비</S.TitleText>
        <S.ResultText>
          0<span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.PriceBox>
        <S.TitleText>결제 예정 금액</S.TitleText>
        <S.ResultText>
          {totalPrice.toLocaleString()}
          <span> 원</span>
        </S.ResultText>
      </S.PriceBox>
    </S.TotalPriceBox>
  );
}

export default TotalPrice;
