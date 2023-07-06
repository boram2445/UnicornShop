import React from "react";
import { Product } from "../../../features/productSlice";
import * as S from "./orderItemStyle";

interface OrderProps {
  item: Product;
  quantity: number;
}

function OrderItem({ item, quantity }: OrderProps) {
  const { image, price, product_name, store_name, shipping_fee } = item;

  return (
    <S.OrederItem>
      <S.ItemInfoBox>
        <S.ImageBox imgUrl={image} />
        <div>
          <S.ShopText>{store_name}</S.ShopText>
          <S.ProductText>{product_name}</S.ProductText>
          <S.CountText>수량 : {quantity}개</S.CountText>
        </div>
      </S.ItemInfoBox>
      <S.PriceBox>
        <S.DisCountText>-</S.DisCountText>
        <S.ShipText>{shipping_fee ? `${shipping_fee.toLocaleString()} 원` : "무료배송"}</S.ShipText>
        <S.ItemPayText>
          <strong>{(price * quantity).toLocaleString()}</strong> 원
        </S.ItemPayText>
      </S.PriceBox>
    </S.OrederItem>
  );
}

export default OrderItem;
