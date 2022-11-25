import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../features/authSlice";
import { fetchPostOrder } from "../../../features/orderSlice";
import { fetchPostItem, ItemPostType } from "../../../features/sellerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import { NumInput, TextInput } from "../InputBox/InputBox";
import UploadImgBox from "../uploadImg/UploadImg";
import * as S from "./uploadFormStyle";

function UploadForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken) || "";

  const initialValues: ItemPostType = {
    product_name: "",
    image: null,
    price: 0,
    shipping_method: "",
    shipping_fee: 0,
    stock: 0,
    product_info: "",
  };
  const [deliveryBtn, setDeliveryBtn] = useState("");
  const [formValues, setFormValues] = useState(initialValues);

  const handleImgFile = (file: File) => {
    setFormValues({ ...formValues, image: file });
  };

  const handleDeiveryBtn = (type: "PARCEL" | "DELIVERY") => {
    setDeliveryBtn(type);
    setFormValues({ ...formValues, shipping_method: type });
  };

  const handleOnChange = (name: string, value: string | number) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formValues);
    dispatch(fetchPostItem({ TOKEN, formValues }));
  };

  const canUpload =
    formValues.product_name &&
    formValues.image &&
    formValues.product_info &&
    formValues.shipping_method;

  return (
    <S.UploadForm onSubmit={handleSubmit}>
      <S.TitleBtnWrap>
        <NormalBtn
          type="button"
          width="120px"
          color="white"
          fontSize="1.6rem"
          onClick={() => navigate("/center")}
        >
          취소
        </NormalBtn>
        {/* 폼 제출 버튼 */}
        <NormalBtn type="submit" width="120px" fontSize="1.6rem" disabled={!canUpload}>
          저장하기
        </NormalBtn>
      </S.TitleBtnWrap>
      {/* 이미지 업로드 */}
      <UploadImgBox handleImgFile={handleImgFile} />
      {/* 상품 정보 업로드 */}
      <S.InputsWrap>
        <TextInput label="상품명" name="product_name" handleOnChange={handleOnChange} />
        <NumInput label="판매가" name="price" unit="원" handleOnChange={handleOnChange}></NumInput>
        <S.BtnWrap>
          <S.Label>배송방법</S.Label>
          <NormalBtn
            type="button"
            width="220px"
            color="white"
            padding="16px 0"
            onClick={() => handleDeiveryBtn("PARCEL")}
            on={deliveryBtn === "PARCEL" ? "true" : "false"}
          >
            택배,소포,등기
          </NormalBtn>
          <NormalBtn
            type="button"
            width="220px"
            color="white"
            padding="16px 0"
            onClick={() => handleDeiveryBtn("DELIVERY")}
            on={deliveryBtn === "DELIVERY" ? "true" : "false"}
          >
            직접배송(화물배달)
          </NormalBtn>
        </S.BtnWrap>
        <NumInput
          label="기본 배송비"
          name="shipping_fee"
          unit="원"
          handleOnChange={handleOnChange}
        />
        <NumInput label="재고" name="stock" unit="개" handleOnChange={handleOnChange} />
      </S.InputsWrap>
      {/* 상품 상세 정보 */}
      <S.DetailWrap>
        <S.Label>상품 상세 정보</S.Label>
        <S.TextArea
          name="product_info"
          placeholder="제품 상세 정보를 적어주세요"
          onChange={(e) => handleOnChange(e.target.name, e.target.value)}
        />
      </S.DetailWrap>
    </S.UploadForm>
  );
}

export default UploadForm;
