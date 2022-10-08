import React, { useState } from "react";
import * as S from "./paginationBtnStyle";
import leftArrow from "../../../assets/icons/icon-swiper-1.svg";
import rightArrow from "../../../assets/icons/icon-swiper-2.svg";

type PageBtnProps = {
  totalPage: number;
  getPageCount: (currentPage: number) => void;
};

function PaginationBtn({ totalPage, getPageCount }: PageBtnProps) {
  const [onPage, setOnPage] = useState(1);
  const handlePageBtnClick = (index: number) => {
    setOnPage(index + 1);
    getPageCount(index + 1);
  };

  return (
    <S.pageList>
      <S.ArrowItem icon={leftArrow} />
      {Array.from({ length: totalPage }).map((_, index) => (
        <S.pageItem
          key={index}
          onClick={() => handlePageBtnClick(index)}
          on={onPage === index + 1 ? "true" : "false"}
        >
          {index + 1}
        </S.pageItem>
      ))}
      <S.ArrowItem icon={rightArrow} />
    </S.pageList>
  );
}

export default PaginationBtn;
