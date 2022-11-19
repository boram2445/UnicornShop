import React from "react";
import { Header } from "../../components/common/Header/Header";
import { CartItem } from "../../features/cartListSlice";
import DeliveryInfo from "../../components/payment/DeliveryInfo/DeliveryInfo";
import FinalPayCheck from "../../components/payment/FinalPayCheck/FinalPayCheck";
import OrderItem from "../../components/payment/OrderItem/OrderItem";
import PayMethod from "../../components/payment/PayMethod/PayMethod";
import * as S from "./paymentPageStyle";

function PaymentPage() {
  const orderItems: CartItem[] = JSON.parse(localStorage.getItem("order") || "{}");
  const totalPrice = orderItems?.reduce((prev, curr) => prev + curr.quantity * curr.item.price, 0);

  return (
    <>
      <Header />
      <S.Title>주문/결제하기</S.Title>
      <S.PaymentSection>
        <S.CartBox>
          <S.CartInfoBox>
            <span></span>
            <S.Text>상품정보</S.Text>
            <S.Text>할인</S.Text>
            <S.Text>수량</S.Text>
            <S.Text>상품금액</S.Text>
          </S.CartInfoBox>
          {orderItems?.map((item) => (
            <OrderItem key={item.product_id} item={item.item} quantity={item.quantity} />
          ))}
          <S.TotalPayText>
            총 주문금액 <strong>{totalPrice.toLocaleString()}원</strong>
          </S.TotalPayText>
        </S.CartBox>
        <DeliveryInfo />
        <S.BottomWrap>
          <PayMethod />
          <FinalPayCheck />
        </S.BottomWrap>
      </S.PaymentSection>
    </>
  );
}

export default PaymentPage;
