import React, { useEffect } from "react";
import * as S from "./totalPriceStyle";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getTotalPrice, selectTotalPrice } from "../../../reducers/cartListSlice";
import plusIcon from "../../../assets/icons/icon-plus-line.svg";
import minusIcon from "../../../assets/icons/icon-minus-line.svg";

function TotalPrice() {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(selectTotalPrice);

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [dispatch]);

  return (
    <S.TotalPriceBox>
      <S.PriceBox>
        <S.TitleText>총 상품 금액</S.TitleText>
        <S.ResultText>
          {totalPrice.toLocaleString()}
          <span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.IconCircle icon={minusIcon} />
      <S.PriceBox>
        <S.TitleText>상품 할인</S.TitleText>
        <S.ResultText>
          0<span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.IconCircle icon={plusIcon} />
      <S.PriceBox>
        <S.TitleText>배송비</S.TitleText>
        <S.ResultText>
          0<span> 원</span>
        </S.ResultText>
      </S.PriceBox>
      <S.PriceBox>
        <S.TitleText type="strong">결제 예정 금액</S.TitleText>
        <S.FinalText>
          {totalPrice.toLocaleString()}
          <span> 원</span>
        </S.FinalText>
      </S.PriceBox>
    </S.TotalPriceBox>
  );
}

export default TotalPrice;
