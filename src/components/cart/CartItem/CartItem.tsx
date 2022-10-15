import React, { useEffect } from "react";
import { NormalBtn } from "../../common/Button/Button";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import { selectProductById } from "../../../features/productSlice";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getDetail, CartItem as Item } from "../../../features/cartListSlice";
import * as S from "./cartItemStyle";

type ItemProps = {
  item: Item;
  deleteItem: (id: number) => void;
  checkHandler: (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => void;
};

function CartItem({ item, deleteItem, checkHandler }: ItemProps) {
  const dispatch = useAppDispatch();
  const { cart_item_id, product_id, quantity, isChecked } = item;
  const detail = useAppSelector((state) => selectProductById(state, Number(product_id)));

  //상품 디테일 가져오기
  useEffect(() => {
    dispatch(getDetail(detail));
  }, []);

  return (
    <S.CartItemArticle>
      <CircleCheckBtn
        name="item"
        productId={product_id}
        checkHandler={checkHandler}
        isChecked={isChecked}
      />
      <S.ImageBox>
        <img src={detail?.image} />
      </S.ImageBox>
      <S.InfoBox>
        <S.ShopText>{detail?.seller_store}</S.ShopText>
        <S.ProductText>{detail?.product_name}</S.ProductText>
        <S.PriceText>{detail?.price.toLocaleString()}원</S.PriceText>
        <S.ShipText>택배배송 / 무료배송</S.ShipText>
      </S.InfoBox>
      {/* 상품 개수 버튼 */}
      <AmountBtn count={quantity} item={item} />
      <S.OrderBox>
        <S.PriceAllText>
          {detail?.price && (detail?.price * quantity).toLocaleString()}원
        </S.PriceAllText>
        <NormalBtn size="small">주문하기</NormalBtn>
      </S.OrderBox>
      <S.DeleteBtn
        onClick={() => {
          deleteItem(cart_item_id);
        }}
      >
        <img src={deleteIcon} />
      </S.DeleteBtn>
    </S.CartItemArticle>
  );
}

export default CartItem;
