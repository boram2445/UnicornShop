import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import CartItem from "../../components/cart/CartItem/CartItem";
import { CircleCheckBtn } from "../../components/common/CheckBtn/CheckBtn";
import * as S from "./cartPageStyle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchGetProducts,
  selectAllProducts,
  getProductStatus,
} from "../../reducers/getProductSlice";
import {
  reset,
  fetchGetCartList,
  fetchDeleteCartItem,
  selectCartList,
} from "../../reducers/cartListSlice";

function CartPage() {
  const dispatch = useAppDispatch();
  const cartLists = useAppSelector(selectCartList);
  const itemDetails = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector(getProductStatus);
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIxIiwiZXhwIjoxNjYzOTE3MzU4fQ.eULwTjycmcIrbyWV4iokrHwKiX4ghxFMbi7OdQENo-s";
  function getItemDetail(id: number) {
    return itemDetails.filter((item) => item.product_id === id)[0];
  }
  function deleteCartItem(id: number) {
    dispatch(fetchDeleteCartItem(id));
  }
  useEffect(() => {
    //상품목록 가져오기
    if (productStatus === "idle") {
      dispatch(fetchGetProducts());
    }
    //장바구니 데이터 불러오기
    dispatch(fetchGetCartList(TOKEN));
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <Navbar />
      <S.CartPageLayout>
        <S.CartPageText>장바구니</S.CartPageText>
        <S.CartInfoBox>
          <CircleCheckBtn />
          <strong>상품정보</strong>
          <strong>수량</strong>
          <strong>상품금액</strong>
        </S.CartInfoBox>
        <S.CartList>
          {cartLists?.map((item) => {
            return (
              <CartItem
                key={item.cart_item_id}
                id={item.cart_item_id}
                count={item.quantity}
                detail={getItemDetail(item.product_id)}
                deleteItem={deleteCartItem}
              />
            );
          })}
        </S.CartList>
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
