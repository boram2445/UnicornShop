import React from "react";
import * as S from "./orderItemStyle";
import { Item } from "../../../features/cartListSlice";

type OrderProps = {
  item: Item;
  quantity: number;
};

function OrderItem({ item, quantity }: OrderProps) {
  const { image, price, product_name, store_name, shipping_fee } = item;
  return (
    <S.OrederItem>
      <S.ImageBox>
        <img src={image} />
      </S.ImageBox>
      <div>
        <S.ShopText>{store_name}</S.ShopText>
        <S.ProductText>{product_name}</S.ProductText>
        <S.CountText>수량 : {quantity}개</S.CountText>
      </div>
      <S.DisCountText>-</S.DisCountText>
      <S.ShipText>{shipping_fee ? `${shipping_fee.toLocaleString()}원` : "무료배송"}</S.ShipText>
      <S.ItemPayText>{(price * quantity).toLocaleString()}원</S.ItemPayText>
    </S.OrederItem>
  );
}

export default OrderItem;
