import React from "react";
import { TabMenuBtn } from "../Button/Button";
import * as S from "../../../pages/CenterPage/centerPageStyle";

interface TabNavProps {
  quantity?: number;
  tabList: { name: string; label: string; num?: number }[];
  selectedTab: string;
  onTabNav: (type: string) => void;
}

function TabNav({ quantity, onTabNav, tabList, selectedTab }: TabNavProps) {
  return (
    <>
      <S.BtnWrap>
        {tabList.map((item, index) => (
          <TabMenuBtn
            key={index}
            fixed={item.name === selectedTab}
            onClick={() => onTabNav(item.name)}
            num={item.num}
          >
            {item.label}
            {item.name === "order" && ` (${quantity})`}
          </TabMenuBtn>
        ))}
      </S.BtnWrap>
    </>
  );
}

export default TabNav;
