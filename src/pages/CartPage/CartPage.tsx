import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
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
  selectCheckedItems,
} from "../../features/cartListSlice";
import Modal from "../../components/common/Modal/Modal";
import { closeModal, openModal, selectOpenState } from "../../features/modalSlice";

function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const TOKEN = useAppSelector(getToken) || "";

  const cartStatus = useAppSelector(getCartListStatus);
  const cartLists = useAppSelector(selectCartList);
  const error = useAppSelector(getCartListError);
  const [getAllDetail, setAllDetail] = useState(false);

  const checkedItems = useAppSelector(selectCheckedItems);
  const isAllChecked = useAppSelector(selectCheckAllState);
  const selectedItemNum = Object.keys(checkedItems).length;
  //모달 설정
  const modal = useAppSelector(selectOpenState);
  const [cartItemId, setCartItemId] = useState(0);
  const [deleteType, setDeleteType] = useState("");

  useEffect(() => {
    dispatch(reset());
    setAllDetail(false);
    dispatch(fetchGetCartList(TOKEN));
  }, []);

  useEffect(() => {
    //상품 디테일을 서버에서 하나씩 받아온다.
    if (cartStatus === "succeeded" && !getAllDetail) {
      cartLists.forEach((item) => {
        dispatch(fetchGetDetail(item.product_id));
      });
    }
  }, [cartStatus]);

  //상품 디테일을 모두 받아왔는지 확인
  if (cartStatus === "succeeded" && !getAllDetail) {
    if (cartLists.every((item) => item.item)) {
      setAllDetail(true);
    }
  }

  //개별 상품 지우기 재확인 모달 열기
  function OpenDeleteModal(cart_item_id: number) {
    dispatch(openModal("확인"));
    setCartItemId(cart_item_id);
    setDeleteType("one");
  }

  //개별 상품 삭제후 모달 닫기
  function deleteCartItem() {
    dispatch(fetchDeleteCartItem({ TOKEN, cart_item_id: cartItemId }));
    dispatch(closeModal());
    setDeleteType("");
  }

  //선택상품 모두 지우기 재확인 모달 열기
  function OpenDeleteAllModal() {
    dispatch(openModal("확인"));
    setDeleteType("selected");
  }

  //선택상품 모두 지우기후 모달 닫기
  function deleteSelectItems() {
    checkedItems.forEach((item) => {
      dispatch(fetchDeleteCartItem({ TOKEN, cart_item_id: item.cart_item_id }));
    });
    dispatch(closeModal());
    setDeleteType("");
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

  //결제 페이지로 넘어가기
  const toOrderPage = () => {
    localStorage.setItem("order", JSON.stringify(checkedItems));
    navigate("/payment");
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
                OpenDeleteModal={OpenDeleteModal}
                checkHandler={checkHandler}
              />
            ))}
            <NormalBtn size="small" color="white" onClick={OpenDeleteAllModal}>
              선택상품 삭제
            </NormalBtn>
          </S.CartList>
          <TotalPrice />

          <NormalBtn size="large" disabled={!selectedItemNum} onClick={toOrderPage}>
            주문하기
          </NormalBtn>
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
      {modal ? (
        <Modal onClickYes={deleteType === "one" ? deleteCartItem : deleteSelectItems}>
          {deleteType === "one" ? "상품을 삭제하시겠습니까?" : "선택한 상품 모두 삭제하시겠습니까?"}
        </Modal>
      ) : null}
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
