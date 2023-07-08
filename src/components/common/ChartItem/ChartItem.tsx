import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getModifyId } from "../../../reducer/sellerSlice";
import { Product } from "../../../reducer/productSlice";
import { getLoginUserType } from "../../../reducer/loginSlice";
import { convertDate } from "../../../utils/convertDate";
import { NormalBtn } from "../Button/Button";
import * as S from "./chartItemStyle";

interface ChartItemProps {
  item: Product;
  quantity?: number;
  orderDate?: string;
  deleteModal: (id: number) => void;
}

function ChartItem({ item, quantity, orderDate, deleteModal }: ChartItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userType = useAppSelector(getLoginUserType);
  const { product_id, product_name, stock, price, image } = item;

  const onModifyBtn = () => {
    dispatch(getModifyId(product_id));
    navigate("/center/upload");
  };

  return (
    <S.ItemContainer>
      <S.InfoWrap>
        <S.ImageBox>
          <img src={image} />
        </S.ImageBox>
        <S.InfoBox>
          <S.ProductText onClick={() => navigate(`/products/${product_id}`)}>
            {product_name}
          </S.ProductText>
          {userType === "BUYER" ? (
            <S.LightText>
              구매 개수 : <strong>{quantity}</strong> 개
            </S.LightText>
          ) : (
            <S.LightText>재고 : {stock} 개</S.LightText>
          )}
        </S.InfoBox>
      </S.InfoWrap>
      <S.PriceText>{price.toLocaleString()} 원</S.PriceText>
      {userType === "BUYER" ? (
        <>
          <S.LightText textAlign="center">{convertDate(orderDate)}</S.LightText>
          <S.LightText textAlign="center">{orderDate && deliveryState(orderDate)}</S.LightText>
        </>
      ) : (
        <>
          <NormalBtn fontSize="1.5rem" padding="0.5rem 0" onClick={onModifyBtn}>
            수정
          </NormalBtn>
          <NormalBtn
            color="white"
            fontSize="1.5rem"
            padding="0.5rem 0"
            onClick={() => deleteModal(product_id)}
          >
            삭제
          </NormalBtn>
        </>
      )}
    </S.ItemContainer>
  );
}

export default ChartItem;

//임시 배송 상태
const deliveryState = (orderDate: string) => {
  const order = new Date(orderDate);
  const now = new Date();
  return (now.getTime() - order.getTime()) / (24 * 60 * 60 * 1000) <= 1
    ? "배송 준비중"
    : "배송완료";
};
