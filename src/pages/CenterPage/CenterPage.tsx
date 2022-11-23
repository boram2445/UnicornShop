import React from "react";
import Chart from "../../components/center/Chart/Chart";
import plusIcon from "../../assets/icons/icon-circle-plus.svg";
import { NormalBtn, TabMenuBtn } from "../../components/common/Button/Button";
import { CenterHeader } from "../../components/common/Header/Header";
import * as S from "./centerPageStyle";
import { useNavigate } from "react-router-dom";
function CenterPage() {
  const navigate = useNavigate();
  return (
    <>
      <CenterHeader />
      <S.Container>
        <S.TitleWrap>
          <S.TitleText>
            대시보드<span>백엔드글로벌</span>
          </S.TitleText>
          <NormalBtn
            icon={plusIcon}
            size="small"
            width="168px"
            onClick={() => navigate("/center/upload")}
          >
            상품 업로드
          </NormalBtn>
        </S.TitleWrap>
        <S.ContentWrap>
          <S.BtnWrap>
            <TabMenuBtn fixed={true} num={0}>
              판매중인 상품
            </TabMenuBtn>
            <TabMenuBtn num={2}>주문/배송</TabMenuBtn>
            <TabMenuBtn num={1}>문의/리뷰</TabMenuBtn>
            <TabMenuBtn>통계</TabMenuBtn>
            <TabMenuBtn>스토어 설정</TabMenuBtn>
          </S.BtnWrap>
          <div>
            <Chart />
          </div>
        </S.ContentWrap>
      </S.Container>
    </>
  );
}

export default CenterPage;
