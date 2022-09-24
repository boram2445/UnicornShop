import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Navbar from "../../components/common/Navbar/Navbar";
import CartItem from "../../components/cart/CartItem/CartItem";
import { CircleCheckBtn } from "../../components/common/CheckBtn/CheckBtn";
import { NormalBtn } from "../../components/common/Button/Button";
import TotalPrice from "../../components/cart/TotalPrice/TotalPrice";
import * as S from "./cartPageStyle";
import {
  reset,
  fetchGetCartList,
  fetchDeleteCartItem,
  selectCartList,
  selectCheckAllState,
  getTotalPrice,
  checkAllItem,
  checkItem,
} from "../../reducers/cartListSlice";

function CartPage() {
  const dispatch = useAppDispatch();
  const cartLists = useAppSelector(selectCartList);
  // const selectedItems = useAppSelector(selectSelectedItems);
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIyIiwiZXhwIjoxNjY0NTIyNzIyfQ.yEWd9zVjAw3Kt-7XYs6xEvIqcMXVjn-08jpjIylRZ5Q";
  useEffect(() => {
    dispatch(fetchGetCartList(TOKEN));
    return () => {
      dispatch(reset());
    };
  }, []);

  const isAllChecked = useAppSelector(selectCheckAllState);
  function deleteCartItem(id: number) {
    dispatch(fetchDeleteCartItem(id));
  }

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      dispatch(checkAllItem({ isChecked: checked }));
    } else {
      dispatch(checkItem({ productId, isChecked: checked }));
    }
    dispatch(getTotalPrice());
  };
  const myCartLists =
    cartLists.length !== 0 ? (
      cartLists.map((item) => (
        <CartItem
          key={item.cart_item_id}
          item={item}
          deleteItem={deleteCartItem}
          checkHandler={checkHandler}
        />
      ))
    ) : (
      <S.NoItemBox>
        <p>장바구니에 담긴 상품이 없습니다.</p>
        <small>원하는 상품을 장바구니에 담아보세요!</small>
      </S.NoItemBox>
    );
  return (
    <>
      <Navbar />
      <S.CartPageLayout>
        <div>
          <S.CartPageText>장바구니</S.CartPageText>
          <S.CartInfoBox>
            <CircleCheckBtn name="allSelect" checkHandler={checkHandler} isChecked={isAllChecked} />
            <S.InfoText>상품정보</S.InfoText>
            <S.CountText>수량</S.CountText>
            <S.PriceText>상품금액</S.PriceText>
          </S.CartInfoBox>
        </div>
        <S.CartList>{myCartLists}</S.CartList>
        {cartLists.length > 0 && (
          <>
            <TotalPrice />
            <NormalBtn size="large">주문하기</NormalBtn>
          </>
        )}
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
