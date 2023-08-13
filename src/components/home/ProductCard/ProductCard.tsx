import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product";
import { convertDate } from "../../../utils/convertDate";
import Badge from "../../common/Badge/Badge";
import * as S from "./productCardStyle";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <S.ProductItem onClick={() => navigate(`/products/${product.product_id}`)}>
      <S.ThumbContainer image={product.image} stock={product.stock}>
        {product.stock === 0 && <Badge />}
      </S.ThumbContainer>
      <S.TextWrap>
        <S.SellerText>{product.store_name}</S.SellerText>
        <S.ProductText>{product.product_name}</S.ProductText>
        <S.PriceText>
          {product.price.toLocaleString()}
          <S.WonText> 원</S.WonText>
        </S.PriceText>
        <S.DescriptionWrap>
          <S.DateText>등록일 {convertDate(product.created_at)}</S.DateText>
          <div className="txt-ellipsis">
            <S.ShipText>
              {product.shipping_method === "PARCEL" ? "직접배송" : "택배배송"} /{" "}
              {product.shipping_fee ? `${product.shipping_fee.toLocaleString()} 원` : "무료배송"}
            </S.ShipText>
            <S.StockText stock={product.stock}>
              재고 : {product.stock === 0 ? "품절" : product.stock}
            </S.StockText>
          </div>
        </S.DescriptionWrap>
      </S.TextWrap>
    </S.ProductItem>
  );
}

export default ProductCard;
