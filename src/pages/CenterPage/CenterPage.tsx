import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { getSellerStatus, selectSellerProducts } from "../../reducer/sellerSlice";
import { NormalBtn } from "../../components/common/Button/Button";
import Chart from "../../components/common/Chart/Chart";
import TabNav from "../../components/common/TabNav/TabNav";
import Spinner from "../../components/common/Spinner/Spinner";
import plusIcon from "../../assets/icons/icon-circle-plus.svg";
import { dummyContent } from "../MyPage/MyPage";
import * as S from "./centerPageStyle";

function CenterPage() {
  const navigate = useNavigate();

  const status = useAppSelector(getSellerStatus);
  const products = useAppSelector(selectSellerProducts);

  const [selectedTab, setSelectedTab] = useState("products");

  const handleTabNav = (type: string) => setSelectedTab(type);

  if (status === "loading") return <Spinner />;
  return (
    <>
      <S.Container>
        <S.TitleWrap>
          <S.TitleText>
            대시보드<span>{products[0]?.store_name || ""}</span>
          </S.TitleText>
          <NormalBtn
            icon={plusIcon}
            padding="0.6rem 1rem"
            fontSize="1.5rem"
            width="12.5rem"
            onClick={() => navigate("/center/upload")}
          >
            상품 업로드
          </NormalBtn>
        </S.TitleWrap>
        <S.ContentWrap>
          <TabNav
            onTabNav={handleTabNav}
            tabList={tabList}
            selectedTab={selectedTab}
            quantity={1}
          />
          {selectedTab === "products" && <Chart />}
          {!(selectedTab === "products") && dummyContent}
        </S.ContentWrap>
      </S.Container>
    </>
  );
}

export default CenterPage;

const tabList = [
  { name: "products", label: "판매중인 상품" },
  { name: "delivery", label: "주문/배송", num: 2 },
  { name: "review", label: "문의/리뷰", num: 1 },
  { name: "chart", label: "통계" },
  { name: "storeInfo", label: "스토어 설정" },
];
