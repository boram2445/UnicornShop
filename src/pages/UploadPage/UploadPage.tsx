import React from "react";
import UploadForm from "../../components/upload/uploadForm/UploadForm";
import WranBox from "../../components/upload/WranBox/WranBox";
import { selectModifyItem } from "../../reducer/sellerSlice";
import { useAppSelector } from "../../hooks";
import * as S from "./uploadPageStyle";

function UploadPage() {
  const itemInfo = useAppSelector(selectModifyItem);

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LeftWrapper>
          <S.TitleText>상품 등록</S.TitleText>
          <WranBox />
        </S.LeftWrapper>
        <UploadForm itemInfo={itemInfo} />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default UploadPage;
