import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getLoginUserType, getToken } from "../../../reducer/loginSlice";
import {
  fetchDeleteSellerItem,
  fetchGetSellerProduct,
  getSellerStatus,
  selectSellerProducts,
} from "../../../reducer/sellerSlice";
import { getOrderState } from "../../../reducer/orderSlice";
import { closeModal, openModal, selectOpenState } from "../../../reducer/modalSlice";
import ChartItem from "../ChartItem/ChartItem";
import Modal from "../Modal/Modal";
import * as S from "./chartStyle";

function Chart() {
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const userType = useAppSelector(getLoginUserType);

  const sellerStatus = userType === "SELLER" && useAppSelector(getSellerStatus);
  const sellProducts = userType === "SELLER" ? useAppSelector(selectSellerProducts) : [];
  const modal = useAppSelector(selectOpenState);
  const { orderedDetail } = useAppSelector(getOrderState);

  const [selectedItemId, setSelectedItemId] = useState(0);

  useEffect(() => {
    if (TOKEN && userType === "SELLER" && sellerStatus === "idle") {
      dispatch(fetchGetSellerProduct(TOKEN));
    }
  }, [TOKEN, userType, sellerStatus]);

  //상품 지우기 확인 모달 열기
  function OpenDeleteModal(product_id: number) {
    dispatch(openModal("확인"));
    setSelectedItemId(product_id);
  }

  //상품 지우기 함수
  function deleteItem() {
    if (TOKEN) {
      dispatch(fetchDeleteSellerItem({ TOKEN, product_id: selectedItemId }));
      dispatch(closeModal());
    }
  }

  //사용자 종류에 따른 content 변경
  let content;
  if (userType === "SELLER") {
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
              <ChartItem key={item.product_id} item={item} deleteModal={OpenDeleteModal} />
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
          {orderedDetail.length === 0 ? (
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
                deleteModal={OpenDeleteModal}
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
      {modal ? <Modal onClickYes={deleteItem}>상품을 삭제하시겠습니까?</Modal> : null}
    </>
  );
}

export default Chart;
