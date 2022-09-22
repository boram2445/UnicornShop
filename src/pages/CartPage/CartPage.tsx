import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import CartItem from "../../components/cart/CartItem/CartItem";
import { CircleCheckBtn } from "../../components/common/CheckBtn/CheckBtn";
import * as S from "./cartPageStyle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  reset,
  fetchGetCartList,
  fetchDeleteCartItem,
  selectCartList,
} from "../../reducers/cartListSlice";

function CartPage() {
  const dispatch = useAppDispatch();
  const cartLists = useAppSelector(selectCartList);
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIxIiwiZXhwIjoxNjYzOTE3MzU4fQ.eULwTjycmcIrbyWV4iokrHwKiX4ghxFMbi7OdQENo-s";
  function deleteCartItem(id: number) {
    dispatch(fetchDeleteCartItem(id));
  }
  useEffect(() => {
    dispatch(fetchGetCartList(TOKEN));
    return () => {
      dispatch(reset());
    };
  }, []);

  const myCartLists =
    cartLists.length !== 0 ? (
      cartLists.map((item) => (
        <CartItem
          key={item.cart_item_id}
          id={item.cart_item_id}
          productId={item.product_id}
          count={item.quantity}
          deleteItem={deleteCartItem}
        />
      ))
    ) : (
      <p>장바구니 상품이 없습니다</p>
    );

  return (
    <>
      <Navbar />
      <S.CartPageLayout>
        <div>
          <S.CartPageText>장바구니</S.CartPageText>
          <S.CartInfoBox>
            <CircleCheckBtn />
            <strong>상품정보</strong>
            <strong>수량</strong>
            <strong>상품금액</strong>
          </S.CartInfoBox>
        </div>
        <S.CartList>{myCartLists}</S.CartList>
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
