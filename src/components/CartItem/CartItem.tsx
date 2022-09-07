import React from "react";
import AmountBtn from "../AmountBtn/AmountBtn";
import Button from "../Button/Button";
import deleteIcon from "../../assets/icon-delete.svg";
import {
  CartListBox,
  RadioBtn,
  ImageBox,
  InfoBox,
  ShopText,
  ProductText,
  PriceText,
  ShipText,
  PriceAllText,
  OrderBox,
  DeleteBtn,
} from "./cartItemStyle";

function CartItem() {
  return (
    <CartListBox>
      <RadioBtn type="radio" name="product" />
      <ImageBox>
        <img src="http://m.saladmarket.co.kr/web/product/big/201908/b5872cbfd6bf28354d227cbb63271993.jpg" />
      </ImageBox>
      <InfoBox>
        <ShopText>백엔드글로벌</ShopText>
        <ProductText>딥러닝 개발자 무릎 담요</ProductText>
        <PriceText>17,500원</PriceText>
        <ShipText>택배배송 / 무료배송</ShipText>
      </InfoBox>
      <AmountBtn />
      <OrderBox>
        <PriceAllText>17,500원</PriceAllText>
        <Button type="small" text="주문하기" />
      </OrderBox>
      <DeleteBtn>
        <img src={deleteIcon} />
      </DeleteBtn>
    </CartListBox>
  );
}

export default CartItem;
