import React from "react";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import { NormalBtn } from "../../common/Button/Button";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import * as S from "./cartItemStyle";

function CartItem() {
  return (
    <S.CartListBox>
      <S.RadioBtn type="radio" name="product" />
      <S.ImageBox>
        <img src="http://m.saladmarket.co.kr/web/product/big/201908/b5872cbfd6bf28354d227cbb63271993.jpg" />
      </S.ImageBox>
      <S.InfoBox>
        <S.ShopText>백엔드글로벌</S.ShopText>
        <S.ProductText>딥러닝 개발자 무릎 담요</S.ProductText>
        <S.PriceText>17,500원</S.PriceText>
        <S.ShipText>택배배송 / 무료배송</S.ShipText>
      </S.InfoBox>
      <AmountBtn />
      <S.OrderBox>
        <S.PriceAllText>17,500원</S.PriceAllText>
        <NormalBtn size="small">주문하기</NormalBtn>
      </S.OrderBox>
      <S.DeleteBtn>
        <img src={deleteIcon} />
      </S.DeleteBtn>
    </S.CartListBox>
  );
}

export default CartItem;
