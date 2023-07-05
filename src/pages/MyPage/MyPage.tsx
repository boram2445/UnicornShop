import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getToken, getLoginUserType } from "../../features/loginSlice";
import {
  fetchAllOrderedDetail,
  fetchPostOrderList,
  getOrderState,
} from "../../features/orderSlice";

import { TabMenuBtn } from "../../components/common/Button/Button";
import Chart from "../../components/common/Chart/Chart";
import * as S from "./myPageStyle";

function MyPage() {
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const USER_TYPE = useAppSelector(getLoginUserType);
  const { orderedInfo, orderedDetail } = useAppSelector(getOrderState);

  useEffect(() => {
    if (TOKEN && USER_TYPE === "BUYER") {
      dispatch(fetchPostOrderList(TOKEN));
    }
  }, []);

  useEffect(() => {
    if (USER_TYPE === "BUYER" && orderedInfo) {
      dispatch(fetchAllOrderedDetail(orderedInfo));
    }
  }, [orderedInfo]);

  let content;
  if (USER_TYPE === "BUYER") {
    content = (
      <>
        <S.BtnWrap>
          <TabMenuBtn fixed={true} num={orderedDetail?.length}>
            주문 상품 조회
          </TabMenuBtn>
          <TabMenuBtn num={1}>문의/리뷰</TabMenuBtn>
          <TabMenuBtn>개인정보 설정</TabMenuBtn>
        </S.BtnWrap>
        <Chart />
      </>
    );
  } else if (USER_TYPE) {
    content = (
      <>
        <S.BtnWrap>
          <TabMenuBtn>개인정보 설정</TabMenuBtn>
        </S.BtnWrap>
        <div>SELLER</div>
      </>
    );
  } else {
    <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <S.Container>
      <S.TitleText>마이페이지</S.TitleText>
      <S.ContentWrap>{content}</S.ContentWrap>
    </S.Container>
  );
}

export default MyPage;
