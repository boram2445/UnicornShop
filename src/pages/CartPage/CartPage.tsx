import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import CartItem from "../../components/cart/CartItem/CartItem";
import { CartPageLayout, CartPageText, CartInfoBox, RadioBtn, CartList } from "./cartPageStyle";
function CartPage() {
  return (
    <>
      <Navbar />
      <CartPageLayout>
        <CartPageText>장바구니</CartPageText>
        <CartInfoBox>
          <RadioBtn type="radio" name="product" />
          <strong>상품정보</strong>
          <strong>수량</strong>
          <strong>상품금액</strong>
        </CartInfoBox>
        <CartList>
          <CartItem />
          <CartItem />
        </CartList>
      </CartPageLayout>
    </>
  );
}

export default CartPage;
