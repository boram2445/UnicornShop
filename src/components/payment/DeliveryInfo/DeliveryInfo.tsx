import React, { useState } from "react";
import { closeModal, openModal, selectOpenState } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { NormalBtn } from "../../common/Button/Button";
import FormInput from "../FormInput/FormInput";
import PostAddress from "../PostAddress/PostAddress";
import * as S from "./deliveryInfoStyle";

function DeliveryInfo() {
  const dispatch = useAppDispatch();

  //우편 번호 찾기 모달
  const modal = useAppSelector(selectOpenState);

  //주문자 정보 - 이름, phone 넘버는 미리 받아오기
  const [ordererInfo, setOrdererInfo] = useState({
    name: "",
    phone: "",
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
    message: "",
  });

  const onOrdererChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrdererInfo({ ...ordererInfo, [e.target.name]: e.target.value });
    console.log(ordererInfo);
  };

  //우편번호, 주소 팝업창에서 받아오기
  const getAddress = (zoneCode: string, address: string) => {
    setReceiverInfo({ ...receiverInfo, zoneCode, address });
    dispatch(closeModal());
  };

  // type ObjType = {
  //   [index: string]: number | string | boolean | null;
  //   id: number;
  //   name: string;
  // };

  // const ordererInput: ObjType[] = [
  //   {
  //     id: 1,
  //     name: "name",
  //     type: "text",
  //     label: "이름",
  //     pattern: "/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/",
  //     required: true,
  //   },
  //   {
  //     id: 2,
  //     name: "phone",
  //     type: "text",
  //     label: "휴대폰",
  //     pattern: "^[0-9]+$",
  //     required: true,
  //   },
  //   {
  //     id: 3,
  //     name: "phone",
  //     type: "email",
  //     label: "이메일",
  //     pattern: "^[0-9]+$",
  //     required: true,
  //   },
  // ];

  return (
    <section>
      <S.Title>배송정보</S.Title>
      <table>
        <S.Catption>주문자 정보</S.Catption>
        <tbody>
          {/* {ordererInput.map((info) => (
            <FormInput
              key={info.id}
              {...info}
              value={ordererInfo[info.name]}
              onChange={onOrdererChange}
            />
          ))} */}
          <S.Row>
            <S.LabelText>이름</S.LabelText>
            <td>
              <S.Input
                type="text"
                name="name"
                onChange={onOrdererChange}
                pattern="/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/"
                required
              />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>휴대폰</S.LabelText>
            <td>
              <S.Input
                type="text"
                size={3}
                width="80px"
                name="phone1"
                onChange={onOrdererChange}
                pattern="^[0-9]+$"
              />
              &nbsp; - &nbsp;
              <S.Input
                type="text"
                size={4}
                width="100px"
                name="phone2"
                onChange={onOrdererChange}
                pattern="^[0-9]+$"
              />
              &nbsp; - &nbsp;
              <S.Input
                type="text"
                size={4}
                width="100px"
                name="phone3"
                onChange={onOrdererChange}
                pattern="^[0-9]+$"
              />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>이메일</S.LabelText>
            <td>
              <S.Input type="email" name="email" onChange={onOrdererChange} />
            </td>
          </S.Row>
        </tbody>
      </table>
      <table>
        <S.Catption>배송지 정보</S.Catption>
        <tbody>
          <S.Row>
            <S.LabelText>수령인</S.LabelText>
            <td>
              <S.Input type="text" />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>휴대폰</S.LabelText>
            <td>
              <S.Input type="text" size={3} width="80px" />
              &nbsp; - &nbsp;
              <S.Input type="text" size={4} width="100px" />
              &nbsp; - &nbsp;
              <S.Input type="text" size={4} width="100px" />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>배송주소</S.LabelText>
            <td rowSpan={3}>
              <S.Input
                type="text"
                width="150px"
                size={5}
                placeholder="우편번호"
                value={receiverInfo.zoneCode}
              />
              <S.BtnWrapper>
                <NormalBtn size="small" onClick={() => dispatch(openModal(""))} type="button">
                  우편번호 찾기
                </NormalBtn>
              </S.BtnWrapper>
              {modal && <PostAddress getAddress={getAddress} />}
              <br />
              <S.Input type="text" width="600px" placeholder="주소" value={receiverInfo.address} />
              <br />
              <S.Input type="text" width="400px" placeholder="상세주소" />
            </td>
          </S.Row>
          <S.Row>
            <S.LabelText>배송 메세지</S.LabelText>
            <td>
              <S.Input type="text" width="600px" />
            </td>
          </S.Row>
        </tbody>
      </table>
    </section>
  );
}

export default DeliveryInfo;
