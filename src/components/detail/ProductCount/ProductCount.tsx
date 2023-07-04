import React from "react";
import * as S from "./productCountStyle";
import AmountBtn from "../../common/AmountBtn/AmountBtn";

interface ProductCountProps {
  getProductCount: (res: number) => void;
  stock: number;
  selectedCount: number;
  price: number;
}

function ProductCount({ getProductCount, stock, selectedCount, price }: ProductCountProps) {
  return (
    <>
      <AmountBtn getCount={getProductCount} stock={stock} />
      <S.PriceBox>
        <S.CountWrapBox>
          <S.PriceDescribeText>총 상품 금액</S.PriceDescribeText>
          <S.CountBox>
            <S.CountText>
              총 수량 <span>{selectedCount}</span>개
            </S.CountText>
            <S.PriceResultText>
              {price && (price * selectedCount).toLocaleString()}
              <span>원</span>
            </S.PriceResultText>
          </S.CountBox>
        </S.CountWrapBox>
      </S.PriceBox>
    </>
  );
}

export default ProductCount;
