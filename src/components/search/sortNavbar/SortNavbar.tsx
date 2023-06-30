import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getSearchState,
  sortLatestDate,
  sortLowerPrice,
  sortUpperPrice,
} from "../../../features/searchSlice";
import * as S from "./sortNavbarStyle";

function SortNavbar() {
  const dispatch = useAppDispatch();
  const { sortType } = useAppSelector(getSearchState);

  return (
    <S.SortNavbar>
      <S.SortTypeList>
        <S.SortType
          onClick={() => dispatch(sortLatestDate())}
          type={sortType === "latestDate" ? "true" : "false"}
        >
          등록일순
        </S.SortType>
        <S.SortType
          onClick={() => dispatch(sortLowerPrice())}
          type={sortType === "lowerPrice" ? "true" : "false"}
        >
          낮은 가격순
        </S.SortType>
        <S.SortType
          onClick={() => dispatch(sortUpperPrice())}
          type={sortType === "upperPrice" ? "true" : "false"}
        >
          높은 가격순
        </S.SortType>
      </S.SortTypeList>
    </S.SortNavbar>
  );
}

export default SortNavbar;
