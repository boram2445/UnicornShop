import React, { useState, useRef } from "react";
import { closeModal, openModal, selectOpenState } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { limitInputLength } from "../../../utils/checkInputValid";
import { NormalBtn } from "../../common/Button/Button";
import FormInput from "../FormInput/FormInput";
import PostAddress from "../PostAddress/PostAddress";
import * as S from "./deliveryInfoStyle";

function DeliveryInfo() {
  const dispatch = useAppDispatch();
  const addressDetailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  //우편 번호 찾기 모달
  const modal = useAppSelector(selectOpenState);

  //주문자 정보 - 이름, phone 넘버는 미리 받아오기
  const [ordererInfo, setOrdererInfo] = useState({
    name: "",
    phone1: "",
    phone2: "",
    phone3: "",
    email: "",
  });
  //배송지 정보
  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone1: "",
    phone2: "",
    phone3: "",
    zoneCode: "",
    address: "",
    addressDetail: "",
    message: "배송전 문자 주세요~",
  });

  //우편번호, 주소 팝업창에서 받아오기
  const getAddress = (zoneCode: string, address: string) => {
    setReceiverInfo({ ...receiverInfo, zoneCode, address });
    dispatch(closeModal());
    addressDetailRef.current.focus();
  };

  //입력 제한
  const limitInputValue = (name: string, value: string) => {
    let newValue = "";
    if (name === "name") {
      newValue = limitInputLength(value, 10);
    } else if (name === "phone1") {
      newValue = limitInputLength(value, 3).replace(/[^0-9]/g, "");
    } else if (name === "phone2" || name === "phone3") {
      newValue = limitInputLength(value, 4).replace(/[^0-9]/g, "");
    } else {
      newValue = value;
    }
    return newValue;
  };

  //주문자 정보 입력
  const onChangeOrdererInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitInputValue(name, value);
    setOrdererInfo({ ...ordererInfo, [name]: newValue });
  };

  //배송지 정보 입력
  const onChangeReceiverInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = limitInputValue(name, value);
    setReceiverInfo({ ...receiverInfo, [name]: newValue });
  };

  return (
    <section>
      <S.Title>
        배송정보 <span>* 모든 항목 입력 필수</span>
      </S.Title>
      <table>
        <S.Caption>주문자 정보</S.Caption>
        <tbody>
          <S.Row>
            <S.LabelText>이름</S.LabelText>
            <td>
              <S.Input
                type="text"
                name="name"
                pattern="^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{0,10}$"
                onChange={onChangeOrdererInfo}
                value={ordererInfo.name}
                autoComplete="off"
              />
              <span>* 한글 혹은 영어 10자 이내로 입력해주세요</span>
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>휴대폰번호</S.LabelText>
            <td>
              <S.Input
                type="text"
                width="80px"
                name="phone1"
                onChange={onChangeOrdererInfo}
                value={ordererInfo.phone1}
                autoComplete="off"
              />
              &nbsp; - &nbsp;
              <S.Input
                type="text"
                width="100px"
                name="phone2"
                onChange={onChangeOrdererInfo}
                value={ordererInfo.phone2}
                autoComplete="off"
              />
              &nbsp; - &nbsp;
              <S.Input
                type="text"
                width="100px"
                name="phone3"
                onChange={onChangeOrdererInfo}
                value={ordererInfo.phone3}
                autoComplete="off"
              />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>이메일</S.LabelText>
            <td>
              <S.Input
                type="email"
                name="email"
                onChange={onChangeOrdererInfo}
                pattern="^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                autoComplete="off"
              />
              <span>* 이메일 형식을 확인해주세요</span>
            </td>
          </S.Row>
        </tbody>
      </table>
      <table>
        <S.Caption>
          <strong>배송지 정보</strong>
          <NormalBtn size="ssmall" color="white" width="180px">
            주문자 정보와 동일
          </NormalBtn>
        </S.Caption>
        <tbody>
          <S.Row>
            <S.LabelText>수령인</S.LabelText>
            <td>
              <S.Input
                name="name"
                type="text"
                pattern="^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{0,10}$"
                onChange={onChangeReceiverInfo}
                value={receiverInfo.name}
                autoComplete="off"
              />
              <span>* 한글 혹은 영어 10자 이내로 입력해주세요</span>
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>휴대폰번호</S.LabelText>
            <td>
              <S.Input
                name="phone1"
                type="text"
                width="80px"
                onChange={onChangeReceiverInfo}
                value={receiverInfo.phone1}
                autoComplete="off"
              />
              &nbsp; - &nbsp;
              <S.Input
                name="phone2"
                type="text"
                width="100px"
                onChange={onChangeReceiverInfo}
                value={receiverInfo.phone2}
                autoComplete="off"
              />
              &nbsp; - &nbsp;
              <S.Input
                name="phone3"
                type="text"
                width="100px"
                onChange={onChangeReceiverInfo}
                value={receiverInfo.phone3}
                autoComplete="off"
              />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>배송주소</S.LabelText>
            <td rowSpan={3}>
              <S.Input
                name="zondCode"
                type="text"
                width="150px"
                placeholder="우편번호"
                defaultValue={receiverInfo.zoneCode}
                readOnly
              />
              <S.BtnWrapper>
                <NormalBtn size="small" onClick={() => dispatch(openModal(""))} type="button">
                  우편번호 찾기
                </NormalBtn>
              </S.BtnWrapper>
              {modal && <PostAddress getAddress={getAddress} />}
              <br />
              <S.Input
                name="address"
                type="text"
                width="600px"
                placeholder="주소"
                defaultValue={receiverInfo.address}
                readOnly
              />
              <br />
              <S.Input
                name="addressDetail"
                type="text"
                width="400px"
                placeholder="상세주소"
                autoComplete="off"
                onChange={onChangeReceiverInfo}
                value={receiverInfo.addressDetail}
                ref={addressDetailRef}
              />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>배송 메세지</S.LabelText>
            <td>
              <S.Input
                name="message"
                type="text"
                width="600px"
                autoComplete="off"
                onChange={onChangeReceiverInfo}
                value={receiverInfo.message}
              />
            </td>
          </S.Row>
        </tbody>
      </table>
    </section>
  );
}

export default DeliveryInfo;
