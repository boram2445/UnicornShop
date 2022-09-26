import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Navbar from "../../components/common/Navbar/Navbar";
import CartItem from "../../components/cart/CartItem/CartItem";
import TotalPrice from "../../components/cart/TotalPrice/TotalPrice";
import { CircleCheckBtn } from "../../components/common/CheckBtn/CheckBtn";
import { NormalBtn } from "../../components/common/Button/Button";
import * as S from "./cartPageStyle";
import {
  fetchGetCartList,
  fetchDeleteCartItem,
  selectCartList,
  getCartListStatus,
  getCartListError,
  selectCheckAllState,
  getTotalPrice,
  checkAllItem,
  checkItem,
  reset,
} from "../../reducers/cartListSlice";

function CartPage() {
  const dispatch = useAppDispatch();

  const cartLists = useAppSelector(selectCartList);
  const cartStatus = useAppSelector(getCartListStatus);
  const error = useAppSelector(getCartListError);
  const isAllChecked = useAppSelector(selectCheckAllState);

  useEffect(() => {
    dispatch(fetchGetCartList(TOKEN));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  //임시 토큰
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIyIiwiZXhwIjoxNjY0NTIyNzIyfQ.yEWd9zVjAw3Kt-7XYs6xEvIqcMXVjn-08jpjIylRZ5Q";

  //카트 상품 가져오기

  function deleteCartItem(id: number) {
    dispatch(fetchDeleteCartItem(id));
  }

  //체크 박스
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      dispatch(checkAllItem({ isChecked: checked }));
    } else {
      dispatch(checkItem({ productId, isChecked: checked }));
    }
    dispatch(getTotalPrice());
  };

  //카트 상품 리스트
  let content;
  if (cartStatus === "Loading") {
    content = <p>Loading...</p>;
  } else if (cartStatus === "succeeded") {
    content =
      cartLists.length !== 0 ? (
        <>
          <S.CartList>
            {cartLists.map((item) => (
              <CartItem
                key={item.cart_item_id}
                item={item}
                deleteItem={deleteCartItem}
                checkHandler={checkHandler}
              />
            ))}
          </S.CartList>
          <TotalPrice />
          <NormalBtn size="large">주문하기</NormalBtn>
        </>
      ) : (
        <S.NoItemBox>
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <small>원하는 상품을 장바구니에 담아보세요!</small>
        </S.NoItemBox>
      );
  } else if (cartStatus === "failed") {
    content = <p>Error : {error}</p>;
  }

  return (
    <>
      <Navbar />
      <S.CartPageLayout>
        <S.CartPageText>장바구니</S.CartPageText>
        <S.CartInfoBox>
          <CircleCheckBtn name="allSelect" checkHandler={checkHandler} isChecked={isAllChecked} />
          <S.InfoText>상품정보</S.InfoText>
          <S.CountText>수량</S.CountText>
          <S.PriceText>상품금액</S.PriceText>
        </S.CartInfoBox>
        {content}
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
