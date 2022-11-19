import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../features/productSlice";
import * as S from "./productCardStyle";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <S.ProductItem onClick={() => navigate(`/products/${product.product_id}`)}>
      <S.ThumbContainer>
        <S.ThumbImg src={product.image} alt="상품 이미지" />
      </S.ThumbContainer>
      <S.ProductCorp>{product.store_name}</S.ProductCorp>
      <S.ProductName>{product.product_name}</S.ProductName>
      <p>
        <S.ProductPrice>{product.price}</S.ProductPrice>
        <S.WordWon>원</S.WordWon>
      </p>
    </S.ProductItem>
  );
}

export default ProductCard;
