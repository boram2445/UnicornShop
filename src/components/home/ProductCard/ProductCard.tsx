import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Product } from "../../../features/productSlice";
import { ReactComponent as CartIcon } from "../../../assets/icons/icon-shopping-cart.svg";
import { ReactComponent as HeartIcon } from "../../../assets/icons/icon-heart.svg";
import * as S from "./productCardStyle";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const handleCartIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("카트에 담기");
  };

  return (
    <S.ProductItem onClick={() => navigate(`/products/${product.product_id}`)}>
      <S.ThumbContainer image={product.image}>
        <div>
          <button type="button" name="장바구니" onClick={handleCartIcon}>
            <CartIcon stroke="white" />
          </button>
          <button type="button" name="좋아요">
            <HeartIcon stroke="white" />
          </button>
        </div>
      </S.ThumbContainer>
      <S.TextWrap>
        <Link to="#">
          <S.SellerText>{product.store_name}</S.SellerText>
        </Link>
        <S.ProductText>{product.product_name}</S.ProductText>
        <S.PriceText>
          {product.price.toLocaleString()}
          <S.WonText> 원</S.WonText>
        </S.PriceText>
      </S.TextWrap>
    </S.ProductItem>
  );
}

export default ProductCard;
