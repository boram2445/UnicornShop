import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import CartItem from "../../components/cart/CartItem/CartItem";
import * as S from "./cartPageStyle";
function CartPage() {
  return (
    <>
      <Navbar />
      <S.CartPageLayout>
        <S.CartPageText>장바구니</S.CartPageText>
        <S.CartInfoBox>
          <S.RadioBtn type="radio" name="product" />
          <strong>상품정보</strong>
          <strong>수량</strong>
          <strong>상품금액</strong>
        </S.CartInfoBox>
        <S.CartList>
          <CartItem />
          <CartItem />
        </S.CartList>
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
