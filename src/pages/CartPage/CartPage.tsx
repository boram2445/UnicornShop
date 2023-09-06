import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCartState, fetchGetAllDetail } from "../../reducer/cartListSlice";
import { useCart } from "../../hooks/useCart";
import { useModal } from "../../hooks/useModal";
import { NormalBtn } from "../../components/common/Button/Button";
import CartInfo from "../../components/cart/CartInfo/CartInfo";
import CartItem from "../../components/cart/CartItem/CartItem";
import TotalPrice from "../../components/cart/TotalPrice/TotalPrice";
import Modal from "../../components/common/Modal/Modal";
import Spinner from "../../components/common/Spinner/Spinner";
import * as S from "./cartPageStyle";

function CartPage() {
  const dispatch = useAppDispatch();
  const {
    openDeleteModal,
    deleteCartItem,
    openDeleteAllModal,
    deleteSelectItems,
    handleCheckInput,
    handleOrderBtn,
    deleteType,
    checkedItems,
    onReset,
  } = useCart();

  const { isOpen } = useModal();
  const { status: cartStatus, detailStatus, error, cartItems } = useAppSelector(getCartState);
  const selectedItemNum = Object.keys(checkedItems).length;

  useEffect(() => {
    if (onReset && cartStatus === "succeeded" && detailStatus !== "succeeded") {
      dispatch(fetchGetAllDetail(cartItems));
    }
  }, [onReset, cartStatus, detailStatus]);

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
                openDeleteModal={openDeleteModal}
                onCheckInput={handleCheckInput}
              />
            ))}
            <NormalBtn color="white" width="11rem" fontSize="1.5rem" onClick={openDeleteAllModal}>
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
            onClick={handleOrderBtn}
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
      {isOpen ? (
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
