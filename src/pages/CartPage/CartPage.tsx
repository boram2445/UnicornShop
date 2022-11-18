import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Link } from "react-router-dom";
import { getToken } from "../../features/authSlice";
import { CircleCheckBtn } from "../../components/common/CheckBtn/CheckBtn";
import { NormalBtn } from "../../components/common/Button/Button";
import { Header } from "../../components/common/Header/Header";
import CartItem from "../../components/cart/CartItem/CartItem";
import TotalPrice from "../../components/cart/TotalPrice/TotalPrice";
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
  fetchGetDetail,
} from "../../features/cartListSlice";
import Modal from "../../components/common/Modal/Modal";
import { closeModal, openModal, selectOpenState } from "../../features/modalSlice";

function CartPage() {
  const dispatch = useAppDispatch();

  const TOKEN = useAppSelector(getToken) || "";
  const cartLists = useAppSelector(selectCartList);
  const cartStatus = useAppSelector(getCartListStatus);
  const error = useAppSelector(getCartListError);
  const isAllChecked = useAppSelector(selectCheckAllState);
  const [getAllDetail, setAllDetail] = useState(false);

  const modal = useAppSelector(selectOpenState);
  const [cartItemId, setCartItemId] = useState(0);
  useEffect(() => {
    dispatch(reset());
    setAllDetail(false);
    dispatch(fetchGetCartList(TOKEN));
  }, []);

  useEffect(() => {
    if (cartStatus === "succeeded" && !getAllDetail) {
      cartLists.forEach((item) => {
        dispatch(fetchGetDetail(item.product_id));
      });
    }
  }, [cartStatus]);

  if (cartStatus === "succeeded" && !getAllDetail) {
    if (cartLists.every((item) => item.item)) {
      setAllDetail(true);
    }
  }

  console.log(cartLists, cartStatus, getAllDetail);

  //상품 지우기 재확인 모달 열기
  function OpenRequestModal(cart_item_id: number) {
    dispatch(openModal("확인"));
    setCartItemId(cart_item_id);
  }

  //상품 삭제후 모달 닫기
  function deleteCartItem() {
    dispatch(fetchDeleteCartItem({ TOKEN, cart_item_id: cartItemId }));
    dispatch(closeModal());
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
  if (cartStatus === "Loading" && !getAllDetail) {
    content = <p>Loading...</p>;
  } else if (cartStatus === "succeeded" && getAllDetail) {
    content =
      cartLists.length !== 0 ? (
        <>
          <S.CartList>
            {cartLists.map((item) => (
              <CartItem
                key={item.cart_item_id}
                item={item}
                detail={item.item}
                OpenRequestModal={OpenRequestModal}
                checkHandler={checkHandler}
              />
            ))}
          </S.CartList>
          <TotalPrice />
          <Link to="/payment">
            <NormalBtn size="large">주문하기</NormalBtn>
          </Link>
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
      <Header />
      {modal ? <Modal onClickYes={deleteCartItem}>상품을 삭제하시겠습니까?</Modal> : null}
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
