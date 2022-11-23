import React from "react";
import { NormalBtn } from "../../common/Button/Button";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import { CartItem as Cart, Item } from "../../../features/cartListSlice";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import * as S from "./cartItemStyle";
import { useNavigate } from "react-router-dom";

type ItemProps = {
  item: Cart;
  detail: Item;
  OpenDeleteModal: (id: number) => void;
  checkHandler: (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => void;
};

function CartItem({ item, detail, OpenDeleteModal, checkHandler }: ItemProps) {
  const navigate = useNavigate();
  const { cart_item_id, product_id, quantity, isChecked } = item;

  const orderOneItem = () => {
    sessionStorage.setItem(
      "order",
      JSON.stringify({ ["type"]: "cart_one_order", ["items"]: [{ ...item }] })
    );
    navigate("/payment");
  };

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
        <S.ShopText>{detail?.store_name}</S.ShopText>
        <S.ProductText>{detail?.product_name}</S.ProductText>
        <S.PriceText>{detail?.price.toLocaleString()}원</S.PriceText>
        <S.ShipText>
          {detail.shipping_method === "PARCEL" ? "직접배송" : "택배배송"} /{" "}
          {detail?.shipping_fee ? `${detail?.shipping_fee.toLocaleString()} 원` : "무료배송"}
        </S.ShipText>
      </S.InfoBox>
      {/* 상품 개수 버튼 */}
      <AmountBtn count={quantity} item={item} stock={item.item.stock} />
      <S.OrderBox>
        <S.PriceAllText>
          {detail?.price && (detail?.price * quantity).toLocaleString()}원
        </S.PriceAllText>
        <NormalBtn width="130px" padding="10px" onClick={orderOneItem}>
          주문하기
        </NormalBtn>
      </S.OrderBox>
      <S.DeleteBtn
        onClick={() => {
          OpenDeleteModal(cart_item_id);
        }}
      >
        <img src={deleteIcon} />
      </S.DeleteBtn>
    </S.CartItemArticle>
  );
}

export default CartItem;
