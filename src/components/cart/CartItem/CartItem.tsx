import React, { useState } from "react";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import { NormalBtn } from "../../common/Button/Button";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import { Detail } from "../../../reducers/getDetailSlice";
import * as S from "./cartItemStyle";

interface ItemProps {
  id: number;
  count: number;
  detail: Detail;
}

function CartItem({ id, count, detail }: ItemProps) {
  const [selectedCount, setSelectedCount] = useState(1);
  const getProductCount = (res: number) => {
    setSelectedCount(res);
  };
  return (
    <S.CartListBox>
      <CircleCheckBtn />
      <S.ImageBox>
        <img src={detail?.image} />
      </S.ImageBox>
      <S.InfoBox>
        <S.ShopText>{detail?.store_name}</S.ShopText>
        <S.ProductText>{detail?.product_name}</S.ProductText>
        <S.PriceText>{detail?.price}원</S.PriceText>
        <S.ShipText>택배배송 / 무료배송</S.ShipText>
      </S.InfoBox>
      {/* 상품 개수 버튼 */}
      <AmountBtn getCount={getProductCount} />
      <S.OrderBox>
        <S.PriceAllText>{detail?.price && detail.price * count}원</S.PriceAllText>
        <NormalBtn size="small">주문하기</NormalBtn>
      </S.OrderBox>
      <S.DeleteBtn>
        <img src={deleteIcon} />
      </S.DeleteBtn>
    </S.CartListBox>
  );
}

export default CartItem;
