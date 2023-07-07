import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../features/loginSlice";
import {
  fetchPostItem,
  fetchPatchSellerItem,
  ItemPostType,
  reset,
  selectModifyId,
} from "../../../features/sellerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import { NumInput, TextInput } from "../InputBox/InputBox";
import { Product } from "../../../features/productSlice";
import UploadImgBox from "../uploadImg/UploadImg";
import Modal from "../../common/Modal/Modal";
import { openModal, selectOpenState } from "../../../features/modalSlice";
import * as S from "./uploadFormStyle";

function UploadForm({ itemInfo }: { itemInfo?: Product }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const TOKEN = useAppSelector(getToken) || "";
  const modifyId = useAppSelector(selectModifyId);
  const modal = useAppSelector(selectOpenState);

  const initialValues: ItemPostType = {
    product_name: itemInfo?.product_name,
    image: itemInfo?.image,
    price: itemInfo?.price,
    shipping_method: itemInfo?.shipping_method,
    shipping_fee: itemInfo?.shipping_fee,
    stock: itemInfo?.stock,
    product_info: itemInfo?.product_info,
  };
  const [deliveryBtn, setDeliveryBtn] = useState(itemInfo?.shipping_method);
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modifyId) {
      const formData = { ...formValues };
      if (itemInfo?.image === formValues.image) delete formData.image;
      dispatch(fetchPatchSellerItem({ TOKEN, product_id: modifyId, formValues: formData }));
    } else {
      dispatch(fetchPostItem({ TOKEN, formValues }));
    }

    dispatch(openModal("네"));
  };

  let modalContent;
  if (modifyId) {
    modalContent = (
      <Modal onClickYes={() => navigate("/center")}>
        상품이 수정되었습니다. <br />
        대시보드로 돌아가시겠습니까?
      </Modal>
    );
  } else {
    modalContent = (
      <Modal onClickYes={() => navigate("/center")}>
        상품이 등록되었습니다. <br />
        대시보드로 돌아가시겠습니까?
      </Modal>
    );
  }

  const canUpload =
    formValues.product_name &&
    formValues.product_info &&
    formValues.shipping_method &&
    (formValues.image || itemInfo?.image);

  return (
    <>
      {modal ? modalContent : null}
      <S.UploadForm onSubmit={handleSubmit}>
        <S.TitleBtnWrap>
          <NormalBtn
            type="button"
            width="10rem"
            padding="0.5rem 0"
            color="white"
            fontSize="1.5rem"
            onClick={() => navigate("/center")}
          >
            취소
          </NormalBtn>
          <NormalBtn
            type="submit"
            width="10rem"
            padding="0.5rem 0"
            fontSize="1.5rem"
            disabled={!canUpload}
          >
            저장하기
          </NormalBtn>
        </S.TitleBtnWrap>
        <UploadImgBox handleImgFile={handleImgFile} image={itemInfo?.image} />
        <S.InputsWrap>
          <TextInput
            label="상품명"
            name="product_name"
            handleOnChange={handleOnChange}
            value={formValues.product_name}
          />
          <NumInput
            label="판매가"
            name="price"
            unit="원"
            handleOnChange={handleOnChange}
            value={formValues.price}
          ></NumInput>
          <S.BtnWrap>
            <S.Label>배송방법</S.Label>
            <NormalBtn
              type="button"
              width="16rem"
              color="white"
              padding="1.2rem 0"
              fontSize="1.5rem"
              onClick={() => handleDeiveryBtn("PARCEL")}
              on={deliveryBtn === "PARCEL" ? "true" : "false"}
            >
              택배,소포,등기
            </NormalBtn>
            <NormalBtn
              type="button"
              width="16rem"
              color="white"
              padding="1.2rem 0"
              fontSize="1.5rem"
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
            value={formValues.shipping_fee}
          />
          <NumInput
            label="재고"
            name="stock"
            unit="개"
            handleOnChange={handleOnChange}
            value={formValues.stock}
          />
        </S.InputsWrap>
        <S.DetailWrap>
          <S.Label>상품 상세 정보</S.Label>
          <S.TextArea
            name="product_info"
            placeholder="제품 상세 정보를 적어주세요"
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            value={formValues.product_info}
          />
        </S.DetailWrap>
      </S.UploadForm>
    </>
  );
}

export default UploadForm;
