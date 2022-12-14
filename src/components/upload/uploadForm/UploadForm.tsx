import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../features/loginSlice";
import {
  fetchPostItem,
  fetchPutSellerItem,
  ItemPostType,
  reset,
  selectModifyId,
} from "../../../features/sellerSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import { NumInput, TextInput } from "../InputBox/InputBox";
import { Product } from "../../../features/productSlice";
import UploadImgBox from "../uploadImg/UploadImg";
import * as S from "./uploadFormStyle";
import Modal from "../../common/Modal/Modal";
import { openModal, selectOpenState } from "../../../features/modalSlice";

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

  console.log(formValues);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modifyId) {
      dispatch(fetchPutSellerItem({ TOKEN, product_id: modifyId, formValues }));
    } else {
      dispatch(fetchPostItem({ TOKEN, formValues }));
    }

    dispatch(openModal("???"));
  };

  let modalContent;
  if (modifyId) {
    modalContent = (
      <Modal onClickYes={() => navigate("/center")}>
        ????????? ?????????????????????. ??????????????? ?????????????????????????
      </Modal>
    );
  } else {
    modalContent = (
      <Modal onClickYes={() => navigate("/center")}>
        ????????? ?????????????????????. ??????????????? ?????????????????????????
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
            width="120px"
            color="white"
            fontSize="1.6rem"
            onClick={() => navigate("/center")}
          >
            ??????
          </NormalBtn>
          {/* ??? ?????? ?????? */}
          <NormalBtn type="submit" width="120px" fontSize="1.6rem" disabled={!canUpload}>
            ????????????
          </NormalBtn>
        </S.TitleBtnWrap>
        {/* ????????? ????????? */}
        <UploadImgBox handleImgFile={handleImgFile} image={itemInfo?.image} />
        {/* ?????? ?????? ????????? */}
        <S.InputsWrap>
          <TextInput
            label="?????????"
            name="product_name"
            handleOnChange={handleOnChange}
            value={formValues.product_name}
          />
          <NumInput
            label="?????????"
            name="price"
            unit="???"
            handleOnChange={handleOnChange}
            value={formValues.price}
          ></NumInput>
          <S.BtnWrap>
            <S.Label>????????????</S.Label>
            <NormalBtn
              type="button"
              width="220px"
              color="white"
              padding="16px 0"
              onClick={() => handleDeiveryBtn("PARCEL")}
              on={deliveryBtn === "PARCEL" ? "true" : "false"}
            >
              ??????,??????,??????
            </NormalBtn>
            <NormalBtn
              type="button"
              width="220px"
              color="white"
              padding="16px 0"
              onClick={() => handleDeiveryBtn("DELIVERY")}
              on={deliveryBtn === "DELIVERY" ? "true" : "false"}
            >
              ????????????(????????????)
            </NormalBtn>
          </S.BtnWrap>
          <NumInput
            label="?????? ?????????"
            name="shipping_fee"
            unit="???"
            handleOnChange={handleOnChange}
            value={formValues.shipping_fee}
          />
          <NumInput
            label="??????"
            name="stock"
            unit="???"
            handleOnChange={handleOnChange}
            value={formValues.stock}
          />
        </S.InputsWrap>
        {/* ?????? ?????? ?????? */}
        <S.DetailWrap>
          <S.Label>?????? ?????? ??????</S.Label>
          <S.TextArea
            name="product_info"
            placeholder="?????? ?????? ????????? ???????????????"
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            value={formValues.product_info}
          />
        </S.DetailWrap>
      </S.UploadForm>
    </>
  );
}

export default UploadForm;
