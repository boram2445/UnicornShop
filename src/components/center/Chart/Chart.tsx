import React from "react";
import ChartItem from "../ChartItem/ChartItem";
import * as S from "./chartStyle";

function Chart() {
  return (
    <S.ChartContainer>
      <S.TopWrap>
        <strong>상품정보</strong>
        <strong>판매가격</strong>
        <strong>수정</strong>
        <strong>삭제</strong>
      </S.TopWrap>
      <ChartItem />
      <div></div>
    </S.ChartContainer>
  );
}

export default Chart;
