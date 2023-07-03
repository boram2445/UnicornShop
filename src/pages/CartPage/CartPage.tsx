import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../features/loginSlice";
import { CircleCheckBtn } from "../../components/common/CheckBtn/CheckBtn";
import { NormalBtn } from "../../components/common/Button/Button";
import CartItem from "../../components/cart/CartItem/CartItem";
import TotalPrice from "../../components/cart/TotalPrice/TotalPrice";
import {
  fetchGetCartList,
  fetchDeleteCartItem,
  selectCheckAllState,
  setTotalPrice,
  checkAllItem,
  checkItem,
  reset,
  selectCheckedItems,
  getCartState,
  fetchGetAllDetail,
} from "../../features/cartListSlice";
import Modal from "../../components/common/Modal/Modal";
import { closeModal, openModal, selectOpenState } from "../../features/modalSlice";
import * as S from "./cartPageStyle";
import Spinner from "../../components/common/Spinner/Spinner";

function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const TOKEN = useAppSelector(getToken) || "";

  const { status: cartStatus, error, cartItems } = useAppSelector(getCartState);
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
    if (cartStatus === "succeeded" && !getAllDetail) {
      dispatch(fetchGetAllDetail(cartItems));
    }
  }, [cartStatus]);

  //상품 디테일을 모두 받아왔는지 확인
  if (cartStatus === "succeeded" && !getAllDetail) {
    if (cartItems.every((item) => item.item)) {
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
    dispatch(setTotalPrice());
  };

  //결제 페이지로 넘어가기
  const toOrderPage = () => {
    const orderType = !isAllChecked ? "cart_one_order" : "cart_order";
    sessionStorage.setItem(
      "order",
      JSON.stringify({ ["type"]: orderType, ["items"]: checkedItems })
    );
    navigate("/payment");
  };

  //카트 상품 리스트
  let content;
  if (cartStatus === "Loading" && !getAllDetail) {
    content = <Spinner />;
  } else if (cartStatus === "succeeded" && getAllDetail) {
    content =
      cartItems.length !== 0 ? (
        <>
          <S.CartList>
            {cartItems.map((item) => (
              <CartItem
                key={item.cart_item_id}
                item={item}
                detail={item.item}
                OpenDeleteModal={OpenDeleteModal}
                checkHandler={checkHandler}
              />
            ))}
            <NormalBtn color="white" width="110px" fontSize="1.6rem" onClick={OpenDeleteAllModal}>
              선택상품 삭제
            </NormalBtn>
          </S.CartList>
          <TotalPrice />
          <NormalBtn
            width="220px"
            padding="18px 0"
            fontSize="2.4rem"
            fontWeight="500"
            disabled={!selectedItemNum}
            onClick={toOrderPage}
          >
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
      {modal ? (
        <Modal onClickYes={deleteType === "one" ? deleteCartItem : deleteSelectItems}>
          {deleteType === "one" || selectedItemNum === 1
            ? "상품을 삭제하시겠습니까?"
            : "선택한 상품 모두 삭제하시겠습니까?"}
        </Modal>
      ) : null}
      <S.CartPageLayout>
        <S.CartPageText>장바구니</S.CartPageText>
        <S.CartInfoBox>
          <CircleCheckBtn name="allSelect" checkHandler={checkHandler} isChecked={isAllChecked} />
          <strong>상품정보</strong>
          <div>
            <strong>수량</strong>
            <strong>상품금액</strong>
          </div>
        </S.CartInfoBox>
        {content}
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
