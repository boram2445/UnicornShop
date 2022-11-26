import React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../../../features/cartListSlice";
import { getModifyId } from "../../../features/sellerSlice";
import { useAppDispatch } from "../../../hooks";
import { NormalBtn } from "../Button/Button";
import * as S from "./chartItemStyle";

interface ChartItemProps {
  item: Item;
  deleteModal: (id: number) => void;
}

function ChartItem({ item, deleteModal }: ChartItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
          <S.ProductText>{product_name}</S.ProductText>
          <S.StockText>재고 : {stock} 개</S.StockText>
        </S.InfoBox>
      </S.InfoWrap>
      <S.PriceText>{price.toLocaleString()} 원</S.PriceText>
      <NormalBtn fontSize="1.6rem" padding="8px 0" onClick={onModifyBtn}>
        수정
      </NormalBtn>
      <NormalBtn
        color="white"
        fontSize="1.6rem"
        padding="8px 0"
        onClick={() => deleteModal(product_id)}
      >
        삭제
      </NormalBtn>
    </S.ItemContainer>
  );
}

export default ChartItem;
