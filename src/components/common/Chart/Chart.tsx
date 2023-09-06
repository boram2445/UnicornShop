import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchDeleteSellerItem, selectSellerProducts } from "../../../reducer/sellerSlice";
import { getOrderedItems } from "../../../reducer/orderSlice";
import { useModal } from "../../../hooks/useModal";
import ChartItem from "../ChartItem/ChartItem";
import Modal from "../Modal/Modal";
import * as S from "./chartStyle";

type Props = {
  isLogined: boolean;
  userType: string;
};

function Chart({ isLogined, userType }: Props) {
  const dispatch = useAppDispatch();
  const { isOpen, open, close } = useModal();

  const sellProducts = userType === "SELLER" ? useAppSelector(selectSellerProducts) : [];
  const orderedDetail = userType === "BUYER" ? useAppSelector(getOrderedItems) : [];

  const [selectedItemId, setSelectedItemId] = useState(0);

  function openDeleteModal(product_id: number) {
    open("확인");
    setSelectedItemId(product_id);
  }

  function deleteItem() {
    if (isLogined) {
      dispatch(fetchDeleteSellerItem({ product_id: selectedItemId }));
      close();
    }
  }

  let content;
  if (userType === "SELLER" && sellProducts) {
    content = (
      <>
        <S.TopWrap>
          <strong>상품정보</strong>
          <strong>판매가격</strong>
          <strong>수정</strong>
          <strong>삭제</strong>
        </S.TopWrap>
        <S.ListWrap>
          {sellProducts.length === 0 ? (
            <S.NoItemBox>
              <p>아직 등록 상품이 없습니다.</p>
              <small>판매할 상품을 업로드해 주세요!</small>
            </S.NoItemBox>
          ) : (
            sellProducts.map((item) => (
              <ChartItem
                key={item.product_id}
                item={item}
                deleteModal={openDeleteModal}
                userType={userType}
              />
            ))
          )}
        </S.ListWrap>
      </>
    );
  } else if (userType === "BUYER") {
    content = (
      <>
        <S.TopWrap>
          <strong>상품정보</strong>
          <strong>구매가격</strong>
          <strong>구매날짜</strong>
          <strong>배송상태</strong>
        </S.TopWrap>
        <S.ListWrap>
          {orderedDetail?.length === 0 ? (
            <S.NoItemBox>
              <p>아직 구매한 상품이 없습니다.</p>
              <small>다양한 상품을 구매해 보세요 :)</small>
            </S.NoItemBox>
          ) : (
            orderedDetail?.map((item) => (
              <ChartItem
                key={`${item.product_id}${item.created_at}`}
                quantity={item.quantity}
                orderDate={item.created_at}
                item={item.detail}
                deleteModal={openDeleteModal}
                userType={userType}
              />
            ))
          )}
        </S.ListWrap>
      </>
    );
  } else {
    <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <>
      <S.ChartContainer>{content}</S.ChartContainer>
      {isOpen ? <Modal onClickYes={deleteItem}>상품을 삭제하시겠습니까?</Modal> : null}
    </>
  );
}

export default Chart;
