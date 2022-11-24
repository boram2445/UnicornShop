import React, { useEffect, useState } from "react";
import { getToken } from "../../../features/authSlice";
import {
  fetchDeleteSellerItem,
  fetchGetSellerProduct,
  getSellerStatus,
  selectSellerProducts,
} from "../../../features/sellerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ChartItem from "../ChartItem/ChartItem";
import Modal from "../../common/Modal/Modal";
import { closeModal, openModal, selectOpenState } from "../../../features/modalSlice";
import * as S from "./chartStyle";

function Chart() {
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const sellerStatus = useAppSelector(getSellerStatus);
  const products = useAppSelector(selectSellerProducts);
  const modal = useAppSelector(selectOpenState);

  const [selectedItemId, setSelectedItemId] = useState(0);

  useEffect(() => {
    if (sellerStatus === "idle" && TOKEN) {
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

  return (
    <>
      {modal ? <Modal onClickYes={deleteItem}>상품을 삭제하시겠습니까?</Modal> : null}
      <S.ChartContainer>
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
      </S.ChartContainer>
    </>
  );
}

export default Chart;
