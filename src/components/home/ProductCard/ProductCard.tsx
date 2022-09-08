import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../reducers/getProductSlice";
import {
  ProductCardLayout,
  ThumbContainer,
  ThumbImg,
  ProductCorp,
  ProductName,
  ProductPrice,
  WordWon,
} from "./productCardStyle";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <ProductCardLayout onClick={() => navigate(`/products/${product.product_id}`)}>
      <ThumbContainer>
        <ThumbImg src={product.image} alt="상품 이미지" />
      </ThumbContainer>
      <ProductCorp>{product.seller_store}</ProductCorp>
      <ProductName>{product.product_name}</ProductName>
      <p>
        <ProductPrice>{product.price}</ProductPrice>
        <WordWon>원</WordWon>
      </p>
    </ProductCardLayout>
  );
}

export default ProductCard;
