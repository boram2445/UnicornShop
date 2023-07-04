import React, { useState } from "react";
import { NormalBtn } from "../../common/Button/Button";
import * as S from "./detailTabStyle";

function DetailTab() {
  const [selectTab, setSelectTab] = useState("제품 상세");
  return (
    <S.TabSection>
      <S.TabWrap>
        <NormalBtn
          tab="true"
          onClick={() => setSelectTab("제품 상세")}
          on={selectTab === "제품 상세" ? "true" : "false"}
        >
          제품 상세
        </NormalBtn>
        <NormalBtn
          tab="true"
          onClick={() => setSelectTab("리뷰")}
          on={selectTab === "리뷰" ? "true" : "false"}
        >
          리뷰
        </NormalBtn>
        <NormalBtn
          tab="true"
          onClick={() => setSelectTab("Q&A")}
          on={selectTab === "Q&A" ? "true" : "false"}
        >
          Q&A
        </NormalBtn>
        <NormalBtn
          tab="true"
          onClick={() => setSelectTab("반품/교환정보")}
          on={selectTab === "반품/교환정보" ? "true" : "false"}
        >
          반품/교환정보
        </NormalBtn>
      </S.TabWrap>
      <S.TabContent>{selectTab}</S.TabContent>
    </S.TabSection>
  );
}

export default DetailTab;
