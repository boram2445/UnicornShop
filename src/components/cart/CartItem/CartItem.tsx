import React, { useState } from "react";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import { NormalBtn } from "../../common/Button/Button";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import { Detail } from "../../../reducers/getDetailSlice";
import * as S from "./cartItemStyle";
import deleteIcon from "../../../assets/icons/icon-delete.svg";

type ItemProps = {
  id: number;
  count: number;
  detail: Detail;
  deleteItem: (id: number) => void;
};

function CartItem({ id, count, detail, deleteItem }: ItemProps) {
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYnV5ZXIxIiwiZXhwIjoxNjYzOTE3MzU4fQ.eULwTjycmcIrbyWV4iokrHwKiX4ghxFMbi7OdQENo-s";
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
      <AmountBtn count={count} getCount={getProductCount} />
      <S.OrderBox>
        <S.PriceAllText>
          {detail?.price && (detail.price * count).toLocaleString()}원
        </S.PriceAllText>
        <NormalBtn size="small">주문하기</NormalBtn>
      </S.OrderBox>
      <S.DeleteBtn
        onClick={() => {
          deleteItem(id);
        }}
      >
        <img src={deleteIcon} />
      </S.DeleteBtn>
    </S.CartListBox>
  );
}

export default CartItem;
