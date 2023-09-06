import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product";
import { NormalBtn } from "../../common/Button/Button";
import { CircleCheckBtn } from "../../common/CheckBtn/CheckBtn";
import AmountBtn from "../../common/AmountBtn/AmountBtn";
import Badge from "../../common/Badge/Badge";
import * as S from "./cartItemStyle";
import { CartProduct } from "../../../types/cart";

type ItemProps = {
  item: CartProduct;
  detail: Product;
  openDeleteModal: (id: number) => void;
  onCheckInput: (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => void;
};

function CartItem({ item, detail, openDeleteModal, onCheckInput }: ItemProps) {
  const navigate = useNavigate();
  const { cart_item_id, product_id, quantity, isChecked } = item;

  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>, productId?: number) => {
    if (!detail?.stock) return;
    onCheckInput(e, productId);
  };

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
        onCheckInput={handleCheckInput}
        isChecked={detail?.stock ? isChecked : false}
      />
      <S.LeftWrap>
        <S.ImageBox imgUrl={detail?.image} stock={detail?.stock}>
          {detail?.stock === 0 && <Badge />}
        </S.ImageBox>
        <div>
          <S.ShopText>{detail?.store_name}</S.ShopText>
          <S.ProductText onClick={() => navigate(`/products/${product_id}`)}>
            {detail?.product_name}
          </S.ProductText>
          <S.PriceText>{detail?.price.toLocaleString()}원</S.PriceText>
          <S.ShipText>
            {detail?.shipping_method === "PARCEL" ? "직접배송" : "택배배송"} /{" "}
            {detail?.shipping_fee ? `${detail?.shipping_fee.toLocaleString()} 원` : "무료배송"}
          </S.ShipText>
        </div>
      </S.LeftWrap>
      <S.RightWrap>
        <div>
          <AmountBtn selectAmount={quantity} item={item} stock={item?.item?.stock} />
          <S.StockText>* 재고 : {detail?.stock}</S.StockText>
        </div>
        <S.OrderBox>
          <S.PriceAllText>
            {detail?.price && (detail?.price * quantity).toLocaleString()}원
          </S.PriceAllText>
          <NormalBtn
            width="11rem"
            padding="0.7rem"
            fontSize="1.5rem"
            onClick={orderOneItem}
            disabled={detail?.stock === 0}
          >
            주문하기
          </NormalBtn>
        </S.OrderBox>
      </S.RightWrap>
      <S.DeleteBtn onClick={() => openDeleteModal(cart_item_id)} />
    </S.CartItemArticle>
  );
}

export default CartItem;
