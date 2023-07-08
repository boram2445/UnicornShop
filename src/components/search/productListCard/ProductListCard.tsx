import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../reducer/productSlice";
import { convertDate } from "../../../utils/convertDate";
import Badge from "../../common/Badge/Badge";
import * as S from "./productListCardStyle";

function ProductListCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <S.ListItem onClick={() => navigate(`/products/${product.product_id}`)}>
      <S.ProductInfoBox>
        <S.ThumbContainer imgUrl={product.image} stock={product.stock}>
          {product.stock === 0 && <Badge />}
        </S.ThumbContainer>
        <div>
          <S.TitleText>{product.product_name}</S.TitleText>
          <S.PriceText>{product.price.toLocaleString()}원</S.PriceText>
          <S.ShipText>
            {product.shipping_method === "PARCEL" ? "직접배송" : "택배배송"} /{" "}
            {product.shipping_fee ? `${product.shipping_fee.toLocaleString()} 원` : "무료배송"}
          </S.ShipText>
        </div>
      </S.ProductInfoBox>
      <S.RightContainer>
        <S.MarketText className={"txt-ellipsis"}>
          <strong>{product.store_name}</strong> 마켓
        </S.MarketText>
        <S.StockText stock={product.stock}>
          재고 : {product.stock === 0 ? "품절" : product.stock}
        </S.StockText>
        <S.DateText>등록일 : {convertDate(product.created_at)}</S.DateText>
      </S.RightContainer>
    </S.ListItem>
  );
}

export default ProductListCard;
