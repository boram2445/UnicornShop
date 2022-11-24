import React, { useEffect } from "react";
import { CartItem } from "../../features/cartListSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOrderItem, selectOrderItems, selectTotalPrice } from "../../features/orderSlice";
import OrderForm from "../../components/payment/OrderForm/OrderForm";
import OrderItem from "../../components/payment/OrderItem/OrderItem";
import * as S from "./paymentPageStyle";

function PaymentPage() {
  const dispatch = useAppDispatch();
  const orderedItems = useAppSelector(selectOrderItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  useEffect(() => {
    const orderInfo: { type: string; items: CartItem[] } = JSON.parse(
      sessionStorage.getItem("order") || "{}"
    );
    dispatch(getOrderItem(orderInfo));
  }, []);

  return (
    <>
      <S.Title>주문/결제하기</S.Title>
      <S.PaymentSection>
        <S.CartBox>
          <S.CartInfoBox>
            <span></span>
            <S.Text>상품정보</S.Text>
            <S.Text>할인</S.Text>
            <S.Text>배송비</S.Text>
            <S.Text>상품금액</S.Text>
          </S.CartInfoBox>
          {orderedItems?.map((item) => (
            <OrderItem key={item.product_id} item={item.item} quantity={item.quantity} />
          ))}
          <S.TotalPayText>
            총 주문금액 <strong>{totalPrice.toLocaleString()}원</strong>
          </S.TotalPayText>
        </S.CartBox>
        <OrderForm />
      </S.PaymentSection>
    </>
  );
}

export default PaymentPage;
