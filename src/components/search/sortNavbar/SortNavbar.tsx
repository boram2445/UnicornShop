import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getSearchState,
  sortLatestDate,
  sortLowerPrice,
  sortUpperPrice,
  switchPostType,
} from "../../../features/searchSlice";
import { ReactComponent as PostAlbumIcon } from "../../../assets/icons/icon-post-album.svg";
import { ReactComponent as PostListIcon } from "../../../assets/icons/icon-post-list.svg";
import * as S from "./sortNavbarStyle";

function SortNavbar() {
  const dispatch = useAppDispatch();
  const { sortType, postType } = useAppSelector(getSearchState);

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
      <div>
        <S.PostTypeBtn type="button" onClick={() => dispatch(switchPostType("list"))}>
          <PostListIcon fill={postType === "list" ? "#767676" : "#DBDBDB"} />
        </S.PostTypeBtn>
        <S.PostTypeBtn type="button" onClick={() => dispatch(switchPostType("album"))}>
          <PostAlbumIcon fill={postType === "album" ? "#767676" : "#DBDBDB"} />
        </S.PostTypeBtn>
      </div>
    </S.SortNavbar>
  );
}

export default SortNavbar;
