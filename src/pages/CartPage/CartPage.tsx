import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../reducer/loginSlice";
import { closeModal, openModal, selectOpenState } from "../../reducer/modalSlice";
import { NormalBtn } from "../../components/common/Button/Button";
import CartInfo from "../../components/cart/CartInfo/CartInfo";
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
} from "../../reducer/cartListSlice";
import Modal from "../../components/common/Modal/Modal";
import Spinner from "../../components/common/Spinner/Spinner";
import * as S from "./cartPageStyle";

function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const TOKEN = useAppSelector(getToken) || "";

  const { status: cartStatus, detailStatus, error, cartItems } = useAppSelector(getCartState);
  const checkedItems = useAppSelector(selectCheckedItems);
  const isAllChecked = useAppSelector(selectCheckAllState);
  const selectedItemNum = Object.keys(checkedItems).length;
  //모달 설정
  const modal = useAppSelector(selectOpenState);
  const [cartItemId, setCartItemId] = useState(0);
  const [deleteType, setDeleteType] = useState("");
  const [onReset, setOnReset] = useState(false);

  useEffect(() => {
    dispatch(reset());
    setOnReset(true);
    dispatch(fetchGetCartList(TOKEN));
  }, []);

  useEffect(() => {
    if (onReset && cartStatus === "succeeded" && detailStatus !== "succeeded") {
      console.log(onReset, cartStatus);
      dispatch(fetchGetAllDetail(cartItems));
    }
  }, [onReset, cartStatus, detailStatus]);

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
  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => {
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
  if (detailStatus !== "succeeded") {
    content = <Spinner />;
  } else if (detailStatus === "succeeded") {
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
                onCheckInput={handleCheckInput}
              />
            ))}
            <NormalBtn color="white" width="11rem" fontSize="1.5rem" onClick={OpenDeleteAllModal}>
              선택상품 삭제
            </NormalBtn>
          </S.CartList>
          <TotalPrice />
          <NormalBtn
            width="22rem"
            padding="1.8rem 0"
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
        <S.CartPageTitle>장바구니</S.CartPageTitle>
        <CartInfo onCheckInput={handleCheckInput} />
        {content}
      </S.CartPageLayout>
    </>
  );
}

export default CartPage;
