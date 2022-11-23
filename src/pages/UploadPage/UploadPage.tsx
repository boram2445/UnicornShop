import React from "react";
import { useNavigate } from "react-router-dom";
import { NormalBtn } from "../../components/common/Button/Button";
import { CenterHeader } from "../../components/common/Header/Header";
import { TextInput, NumInput } from "../../components/upload/InputBox/InputBox";
import UploadImgBox from "../../components/upload/uploadImg/UploadImg";
import WranBox from "../../components/upload/WranBox/WranBox";
import * as S from "./uploadPageStyle";

function UploadPage() {
  const navigate = useNavigate();
  return (
    <>
      <CenterHeader />
      <S.Container>
        <S.TitleWrap>
          <S.TitleText>상품 등록</S.TitleText>
          <S.TitleBtnWrap>
            <NormalBtn size="small" width="120px" color="white" onClick={() => navigate("/center")}>
              취소
            </NormalBtn>
            <NormalBtn size="small" width="120px">
              저장하기
            </NormalBtn>
          </S.TitleBtnWrap>
        </S.TitleWrap>
        <S.ContentWrapper>
          <WranBox />
          <S.RightWrap>
            {/* 상품 등록 */}
            <UploadImgBox />
            <S.InputsWrap>
              <TextInput label="상품명" />
              <NumInput label="판매가" unit="원"></NumInput>
              <S.BtnWrap>
                <S.Label>배송방법</S.Label>
                <NormalBtn width="220px">택배,소포,등기</NormalBtn>
                <NormalBtn width="220px" color="white">
                  직접배송(화물배달)
                </NormalBtn>
              </S.BtnWrap>
              <NumInput label="기본 배송비" unit="원" />
              <NumInput label="재고" unit="개" />
            </S.InputsWrap>
            {/* 상품 상세 정보 */}
            <S.DetailWrap>
              <S.Label>상품 상세 정보</S.Label>
              <S.ItemDetail>에디터 영역</S.ItemDetail>
            </S.DetailWrap>
          </S.RightWrap>
        </S.ContentWrapper>
      </S.Container>
    </>
  );
}

export default UploadPage;
