import React from "react";
import { useAppSelector } from "../../../hooks";
import { getLoginUserType } from "../../../features/loginSlice";
import { TabMenuBtn } from "../../common/Button/Button";
import * as S from "../../../pages/CenterPage/centerPageStyle";

interface TabNavProps {
  orderedQuantity?: number;
  onTabNav: (type: string) => void;
  tabType: string;
}

function TabNav({ orderedQuantity, onTabNav, tabType }: TabNavProps) {
  const userType = useAppSelector(getLoginUserType);

  if (userType === "SELLER") {
    return (
      <>
        <S.BtnWrap>
          <TabMenuBtn fixed={true}>개인정보 설정</TabMenuBtn>
        </S.BtnWrap>
      </>
    );
  }
  return (
    <>
      <S.BtnWrap>
        <TabMenuBtn fixed={tabType === "order"} onClick={() => onTabNav("order")}>
          주문 상품 조회({orderedQuantity})
        </TabMenuBtn>
        <TabMenuBtn fixed={tabType === "review"} num={1} onClick={() => onTabNav("review")}>
          문의/리뷰
        </TabMenuBtn>
        <TabMenuBtn fixed={tabType === "myInfo"} onClick={() => onTabNav("myInfo")}>
          개인정보 설정
        </TabMenuBtn>
      </S.BtnWrap>
    </>
  );
}

export default TabNav;
