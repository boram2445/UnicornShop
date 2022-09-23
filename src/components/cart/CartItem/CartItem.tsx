import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import { NormalBtn } from "../../common/Button/Button";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import { selectProductById } from "../../../reducers/productSlice";
import * as S from "./cartItemStyle";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import { handleCheckedItem } from "../../../reducers/cartListSlice";

type ItemProps = {
  id: number;
  productId: number;
  count: number;
  deleteItem: (id: number) => void;
};

function CartItem({ id, count, productId, deleteItem }: ItemProps) {
  const dispatch = useAppDispatch();
  const [selectedCount, setSelectedCount] = useState(count);
  const detail = useAppSelector((state) => selectProductById(state, Number(productId)));
  const getProductCount = (res: number) => {
    setSelectedCount(res);
  };

  return (
    <S.CartListBox>
      <CircleCheckBtn productId={productId} price={detail?.price} count={selectedCount} />
      <S.ImageBox>
        <img src={detail?.image} />
      </S.ImageBox>
      <S.InfoBox>
        <S.ShopText>{detail?.seller_store}</S.ShopText>
        <S.ProductText>{detail?.product_name}</S.ProductText>
        <S.PriceText>{detail?.price}원</S.PriceText>
        <S.ShipText>택배배송 / 무료배송</S.ShipText>
      </S.InfoBox>
      {/* 상품 개수 버튼 */}
      <AmountBtn count={selectedCount} getCount={getProductCount} />
      <S.OrderBox>
        <S.PriceAllText>
          {detail?.price && (detail?.price * selectedCount).toLocaleString()}원
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
