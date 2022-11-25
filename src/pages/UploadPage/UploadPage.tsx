import React from "react";
import UploadForm from "../../components/upload/uploadForm/UploadForm";
import WranBox from "../../components/upload/WranBox/WranBox";
import * as S from "./uploadPageStyle";

function UploadPage() {
  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LeftWrapper>
          <S.TitleText>상품 등록</S.TitleText>
          <WranBox />
        </S.LeftWrapper>
        <UploadForm />
      </S.ContentWrapper>
    </S.Container>
  );
}

export default UploadPage;
