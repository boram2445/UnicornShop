import React, { useEffect } from "react";
import { Header } from "../../components/common/Header/Header";
import { CartItem } from "../../features/cartListSlice";
import DeliveryInfo from "../../components/payment/DeliveryInfo/DeliveryInfo";
import FinalPayCheck from "../../components/payment/FinalPayCheck/FinalPayCheck";
import OrderItem from "../../components/payment/OrderItem/OrderItem";
import PayMethod from "../../components/payment/PayMethod/PayMethod";
import * as S from "./paymentPageStyle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getOrderItem, selectOrderItems, selectTotalPrice } from "../../features/orderSlice";

function PaymentPage() {
  const dispatch = useAppDispatch();
  const orderedItems = useAppSelector(selectOrderItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  useEffect(() => {
    const orderItems: CartItem[] = JSON.parse(sessionStorage.getItem("order") || "{}");
    dispatch(getOrderItem(orderItems));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
        <form onSubmit={handleSubmit}>
          <DeliveryInfo />
          <S.BottomWrap>
            <PayMethod />
            <FinalPayCheck />
          </S.BottomWrap>
        </form>
      </S.PaymentSection>
    </>
  );
}

export default PaymentPage;
