import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NormalBtn } from "../../common/Button/Button";
import { NumInput, TextInput } from "../InputBox/InputBox";
import UploadImgBox from "../uploadImg/UploadImg";
import * as S from "./uploadFormStyle";

function UploadForm() {
  const navigate = useNavigate();
  const [deliveryBtn, setDeliveryBtn] = useState("");

  return (
    <S.UploadForm>
      <S.TitleBtnWrap>
        {/* 폼 제출 버튼 */}
        <NormalBtn
          type="button"
          width="120px"
          color="white"
          fontSize="1.6rem"
          onClick={() => navigate("/center")}
        >
          취소
        </NormalBtn>
        <NormalBtn type="submit" width="120px" fontSize="1.6rem">
          저장하기
        </NormalBtn>
      </S.TitleBtnWrap>

      <UploadImgBox />
      <S.InputsWrap>
        <TextInput label="상품명" />
        <NumInput label="판매가" unit="원"></NumInput>
        <S.BtnWrap>
          <S.Label>배송방법</S.Label>
          <NormalBtn
            type="button"
            width="220px"
            color="white"
            padding="16px 0"
            onClick={() => setDeliveryBtn("PARCEL")}
            on={deliveryBtn === "PARCEL" ? "true" : "false"}
          >
            택배,소포,등기
          </NormalBtn>
          <NormalBtn
            type="button"
            width="220px"
            color="white"
            padding="16px 0"
            onClick={() => setDeliveryBtn("DELIVERY")}
            on={deliveryBtn === "DELIVERY" ? "true" : "false"}
          >
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
    </S.UploadForm>
  );
}

export default UploadForm;
