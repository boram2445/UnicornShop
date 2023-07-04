import React from "react";
import { useAppSelector } from "../../../hooks";
import { getDetailState } from "../../../features/detailSlice";
import Badge from "../../common/Badge/Badge";
import * as S from "./productDetailStyle";

function ProductDetail() {
  const { detail } = useAppSelector(getDetailState);

  return (
    <>
      {/* 상품 정보 */}
      <S.InfoBox>
        <S.SellerText>{detail?.store_name}</S.SellerText>
        <S.ProductText>
          <strong>{detail?.product_name}</strong>
          {detail?.stock === 0 && <Badge />}
        </S.ProductText>
        <S.PriceText>
          {detail?.price.toLocaleString()}
          <span>원</span>
        </S.PriceText>
      </S.InfoBox>

      {/* 상품 장바구니 담기 */}
      <S.DetailWrap>
        <div>
          <S.DetailText>
            {detail?.shipping_method === "PARCEL" ? "직접배송" : "택배배송"} /{" "}
            {detail?.shipping_fee === 0
              ? "무료배송"
              : `배송비 ${detail?.shipping_fee.toLocaleString()} 원`}
          </S.DetailText>
          <S.StockText>* 재고 : {detail?.stock} 개</S.StockText>
        </div>
      </S.DetailWrap>
    </>
  );
}

export default ProductDetail;
