import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Product } from "../../../features/productSlice";
import * as S from "./productCardStyle";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <S.ProductItem onClick={() => navigate(`/products/${product.product_id}`)}>
      <S.ThumbContainer>
        <S.ThumbImg src={product.image} alt="상품 이미지" />
      </S.ThumbContainer>
      <Link to="#">
        <S.SellerText>{product.store_name}</S.SellerText>
      </Link>
      <S.ProductText>{product.product_name}</S.ProductText>
      <p>
        <S.PriceText>{product.price.toLocaleString()}</S.PriceText>
        <S.WordWon> 원</S.WordWon>
      </p>
    </S.ProductItem>
  );
}

export default ProductCard;
