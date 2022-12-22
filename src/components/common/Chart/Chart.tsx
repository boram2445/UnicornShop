import React, { useEffect, useState } from "react";
import { getLoginUserType, getToken } from "../../../features/loginSlice";
import {
  fetchDeleteSellerItem,
  fetchGetSellerProduct,
  getSellerStatus,
  selectSellerProducts,
} from "../../../features/sellerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ChartItem from "../ChartItem/ChartItem";
import Modal from "../Modal/Modal";
import { closeModal, openModal, selectOpenState } from "../../../features/modalSlice";
import * as S from "./chartStyle";

function Chart() {
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const USER_TYPE = useAppSelector(getLoginUserType);

  const sellerStatus = useAppSelector(getSellerStatus);
  const products = useAppSelector(selectSellerProducts);
  const modal = useAppSelector(selectOpenState);

  const [selectedItemId, setSelectedItemId] = useState(0);

  useEffect(() => {
    if (TOKEN && USER_TYPE === "SELLER" && sellerStatus === "idle") {
      dispatch(fetchGetSellerProduct(TOKEN));
    }
  }, []);

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
  if (USER_TYPE === "SELLER") {
    content = (
      <>
        <S.TopWrap>
          <strong>상품정보</strong>
          <strong>판매가격</strong>
          <strong>수정</strong>
          <strong>삭제</strong>
        </S.TopWrap>
        <S.ListWrap>
          {products.length === 0 ? (
            <S.NoItemBox>
              <p>아직 등록 상품이 없습니다.</p>
              <small>판매할 상품을 업로드해 주세요!</small>
            </S.NoItemBox>
          ) : (
            products.map((item) => (
              <ChartItem key={item.product_id} item={item} deleteModal={OpenDeleteModal} />
            ))
          )}
        </S.ListWrap>
      </>
    );
  } else if (USER_TYPE === "BUYER") {
    content = (
      <>
        <S.TopWrap>
          <strong>상품정보</strong>
          <strong>구매가격</strong>
          <strong>구매날짜</strong>
          <strong>배송상태</strong>
        </S.TopWrap>
        <S.ListWrap></S.ListWrap>
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
