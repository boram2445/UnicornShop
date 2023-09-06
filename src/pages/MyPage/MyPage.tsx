import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchOrderedDetails, fetchGetOrderList, getOrderState } from "../../reducer/orderSlice";
import { useUser } from "../../hooks/useUser";
import TabNav from "../../components/common/TabNav/TabNav";
import Spinner from "../../components/common/Spinner/Spinner";
import Chart from "../../components/common/Chart/Chart";
import { NoItemBox } from "../CartPage/cartPageStyle";
import * as S from "../../pages/CenterPage/centerPageStyle";

function MyPage() {
  const dispatch = useAppDispatch();
  const { status, detailStatus, orderedInfo, orderedDetail } = useAppSelector(getOrderState);
  const { isLogined, userType } = useUser();

  const [selectedTab, setSelectedTab] = useState(userType === "BUYER" ? "order" : "myInfo");

  useEffect(() => {
    if (isLogined && userType === "BUYER") {
      dispatch(fetchGetOrderList());
    }
  }, [isLogined, userType]);

  useEffect(() => {
    if (userType === "BUYER" && orderedInfo) {
      dispatch(fetchOrderedDetails(orderedInfo));
    }
  }, [orderedInfo, orderedInfo]);

  const handleTabNav = (type: string) => setSelectedTab(type);

  let content;
  if (userType === "BUYER" && selectedTab === "order")
    content = <Chart isLogined={isLogined} userType={userType} />;
  else content = dummyContent;

  if (status === "loading" || detailStatus === "loading") return <Spinner />;
  return (
    <S.Container>
      <S.TitleText>마이페이지</S.TitleText>
      <S.ContentWrap>
        <TabNav
          onTabNav={handleTabNav}
          tabList={userType === "BUYER" ? buyerTabList : sellerTabList}
          selectedTab={selectedTab}
          quantity={orderedDetail?.length}
        />
        {content}
      </S.ContentWrap>
    </S.Container>
  );
}

export default MyPage;

const buyerTabList = [
  { name: "order", label: " 주문 상품 조회" },
  { name: "review", label: "문의/리뷰", num: 1 },
  { name: "myInfo", label: "개인정보 설정" },
];

const sellerTabList = [{ name: "myInfo", label: "개인정보 설정" }];

export const dummyContent = (
  <NoItemBox>
    <p>콘텐츠를 준비중 입니다.</p> <small> 조금만 기다려 주세요 :)</small>
  </NoItemBox>
);
