import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./chartItemStyle";

function ChartItem() {
  return (
    <S.ItemContainer>
      <S.InfoWrap>
        <S.ImageBox>
          <img
            src={
              "https://w.namu.la/s/12856db09720692cf725a41251e754bcd05c10bbac7b3343e25396a8acf7997dea06bfe981695a056bcbc6d927b6430fd74070476bfd3f9c13724929aff71f2e206be5798e088e0250834484d4326d9b426ff020c084668c44bc68b84f1d03bc"
            }
          />
        </S.ImageBox>
        <S.InfoBox>
          <S.ProductText>딥러닝 개발자 무릎 담요</S.ProductText>
          <S.StockText>재고 :370개</S.StockText>
        </S.InfoBox>
      </S.InfoWrap>
      <S.PriceText>17,500원</S.PriceText>
      <NormalBtn size="ssmall">수정</NormalBtn>
      <NormalBtn size="ssmall" color="white">
        삭제
      </NormalBtn>
    </S.ItemContainer>
  );
}

export default ChartItem;
