import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setTotalPrice, getCartState } from "../../../features/cartListSlice";
import { ReactComponent as PlusIcon } from "../../../assets/icons/icon-plus-line.svg";
import { ReactComponent as MinusIcon } from "../../../assets/icons/icon-minus-line.svg";
import * as S from "./totalPriceStyle";

function TotalPrice() {
  const dispatch = useAppDispatch();
  const { totalPrice, deliveryPrice } = useAppSelector(getCartState);

  useEffect(() => {
    dispatch(setTotalPrice());
  }, []);

  return (
    <S.TotalPriceBox>
      <S.PriceBox>
        <S.TitleText>총 상품 금액</S.TitleText>
        <S.ResultText>
          {totalPrice.toLocaleString()}
          <span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.IconCircle>
        <MinusIcon stroke="#C4C4C4" />
      </S.IconCircle>
      <S.PriceBox>
        <S.TitleText>상품 할인</S.TitleText>
        <S.ResultText>
          0<span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.IconCircle>
        <PlusIcon stroke="#C4C4C4" />
      </S.IconCircle>
      <S.PriceBox>
        <S.TitleText>배송비</S.TitleText>
        <S.ResultText>
          {deliveryPrice.toLocaleString()}
          <span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.PriceBox>
        <S.TitleText type="strong">결제 예정 금액</S.TitleText>
        <S.FinalText>
          {(totalPrice + deliveryPrice).toLocaleString()}
          <span> 원</span>
        </S.FinalText>
      </S.PriceBox>
    </S.TotalPriceBox>
  );
}

export default TotalPrice;
