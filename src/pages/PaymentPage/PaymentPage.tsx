import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOrderItem, getOrderState } from "../../reducer/orderSlice";
import OrderForm from "../../components/payment/OrderForm/OrderForm";
import OrderItem from "../../components/payment/OrderItem/OrderItem";
import * as S from "./paymentPageStyle";
import { CartProduct } from "../../types/cart";

function PaymentPage() {
  const dispatch = useAppDispatch();
  const { orderItems, totalPrice } = useAppSelector(getOrderState);

  useEffect(() => {
    const orderInfo: { type: string; items: CartProduct[] } = JSON.parse(
      sessionStorage.getItem("order") || "{}"
    );
    dispatch(setOrderItem(orderInfo));
  }, []);

  return (
    <S.PaymentLayout>
      <S.Title>주문/결제하기</S.Title>
      <S.CartBox>
        <S.CartInfoBox>
          <strong>상품정보</strong>
          <strong>할인</strong>
          <strong>배송비</strong>
          <strong>상품금액</strong>
        </S.CartInfoBox>
        {orderItems?.map((item) => (
          <OrderItem key={item.product_id} item={item.item} quantity={item.quantity} />
        ))}
        <S.TotalPayText>
          총 주문금액 <strong>{totalPrice.toLocaleString()} 원</strong>
        </S.TotalPayText>
      </S.CartBox>
      <OrderForm />
    </S.PaymentLayout>
  );
}

export default PaymentPage;
