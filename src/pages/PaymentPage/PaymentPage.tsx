import React from "react";
import Header from "../../components/common/Header/Header";
import DeliveryInfo from "../../components/payment/DeliveryInfo/DeliveryInfo";
import FinalPayCheck from "../../components/payment/FinalPayCheck/FinalPayCheck";
import OrderItem from "../../components/payment/OrderItem/OrderItem";
import PayMethod from "../../components/payment/PayMethod/PayMethod";
import { useAppSelector } from "../../hooks";
import * as S from "./paymentPageStyle";
import { selectCheckedItems, selectTotalPrice } from "../../features/cartListSlice";

function PaymentPage() {
  const cartItems = useAppSelector(selectCheckedItems);
  const totalPrice = useAppSelector(selectTotalPrice);
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
          {cartItems?.map((item) => (
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
