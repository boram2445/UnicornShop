import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getToken, getLoginUserType } from "../../features/loginSlice";
import {
  fetchAllOrderedDetail,
  fetchPostOrderList,
  getOrderState,
} from "../../features/orderSlice";
import TabNav from "../../components/myPage/TabNav/TabNav";
import Spinner from "../../components/common/Spinner/Spinner";
import Chart from "../../components/common/Chart/Chart";
import { NoItemBox } from "../CartPage/cartPageStyle";
import * as S from "../../pages/CenterPage/centerPageStyle";

function MyPage() {
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken);
  const userType = useAppSelector(getLoginUserType);
  const { status, orderedInfo, orderedDetail } = useAppSelector(getOrderState);

  const [tabType, setTabType] = useState(userType === "BUYER" ? "order" : "myInfo");

  useEffect(() => {
    if (TOKEN && userType === "BUYER") {
      dispatch(fetchPostOrderList(TOKEN));
    }
  }, []);

  useEffect(() => {
    if (userType === "BUYER" && orderedInfo) {
      dispatch(fetchAllOrderedDetail(orderedInfo));
    }
  }, [orderedInfo]);

  const handleTabNav = (type: string) => setTabType(type);

  let content;
  if (userType === "BUYER" && tabType === "order") content = <Chart />;
  else content = dummyContent;

  if (status === "loading") return <Spinner />;
  return (
    <S.Container>
      <S.TitleText>마이페이지</S.TitleText>
      <S.ContentWrap>
        <TabNav onTabNav={handleTabNav} tabType={tabType} orderedQuantity={orderedDetail?.length} />
        {content}
      </S.ContentWrap>
    </S.Container>
  );
}

export default MyPage;

const dummyContent = (
  <NoItemBox>
    <p>콘텐츠를 준비중 입니다.</p> <small> 조금만 기다려 주세요 :)</small>
  </NoItemBox>
);
