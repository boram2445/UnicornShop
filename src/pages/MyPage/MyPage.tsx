import React, { useEffect } from "react";
import { TabMenuBtn } from "../../components/common/Button/Button";
import Chart from "../../components/common/Chart/Chart";
import { getToken, getLoginUserType } from "../../features/loginSlice";
import { fetchPostOrderList, getOrderState } from "../../features/orderSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as S from "./myPageStyle";

function MyPage() {
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const USER_TYPE = useAppSelector(getLoginUserType);
  const { orderInfo } = useAppSelector(getOrderState);

  useEffect(() => {
    if (TOKEN && USER_TYPE === "BUYER") {
      dispatch(fetchPostOrderList(TOKEN));
    }
  }, []);

  //구매정보에 넘버밖에 없어서 또 디테일 정보를 서버에서 받아와야 한다.
  //구매 완료 후에는 구매 내역을 보여주는 페이지에서 보여주어야 한다.
  console.log(orderInfo);

  let content;
  if (USER_TYPE === "BUYER") {
    content = (
      <>
        <S.BtnWrap>
          {/* <TabMenuBtn fixed={true} num={orderInfo?.count}>
            주문 상품 조회
          </TabMenuBtn> */}
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
