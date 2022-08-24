import React from "react";
import {
  ThumbContainer,
  ThumbImg,
  ProductCorp,
  ProductName,
  ProductPrice,
  WordWon,
} from "./productCardStyle";

type ProductProps = {
  image: string;
  price: number;
  product_id: number;
  product_info: string;
  product_name: string;
  seller: number;
  seller_store: string;
  shipping_fee: number;
  shipping_method: string;
  stock: number;
};

const ProductCard = ({ product }: { product: ProductProps }) => {
  return (
    <>
      <ThumbContainer>
        <ThumbImg src={product.image} alt="상품 이미지" />
      </ThumbContainer>
      <ProductCorp>{product.seller_store}</ProductCorp>
      <ProductName>{product.product_name}</ProductName>
      <p>
        <ProductPrice>{product.price}</ProductPrice>
        <WordWon>원</WordWon>
      </p>
    </>
  );
};

export default ProductCard;
