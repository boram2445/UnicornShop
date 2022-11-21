import React, { useState, useRef } from "react";
import { closeModal, openModal, selectOpenState } from "../../../features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { limitInputLength } from "../../../utils/checkInputValid";
import { NormalBtn } from "../../common/Button/Button";
import SelectInput from "../../common/SelectInput/SelectInput";
import PostAddress from "../PostAddress/PostAddress";
import * as S from "./deliveryInfoStyle";

function DeliveryInfo() {
  const dispatch = useAppDispatch();
  const addressDetailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const phoneSelect = ["010", "011", "016", "017", "018", "019"];
  const messageSelect = [
    "배송전 미리 연락 바랍니다.",
    "부재시 경비실에 맡겨 주세요.",
    "부재시 전화주시거나 문자 남겨 주세요.",
  ];
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
    phone1: phoneSelect[0],
    phone2: "",
    phone3: "",
    zoneCode: "",
    address: "",
    addressDetail: "",
    message: messageSelect[0],
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

  //주문자 정보와 동일 버튼 클릭
  const handleSameInfoBtn = () => {
    const { name, phone1, phone2, phone3 } = ordererInfo;
    setReceiverInfo({ ...receiverInfo, name, phone1, phone2, phone3 });
  };

  return (
    <section>
      <S.Title>
        배송정보 <S.ErrorText>* 모든 항목 입력 필수</S.ErrorText>
      </S.Title>
      <section>
        <S.SectionTitle>주문자 정보</S.SectionTitle>
        <S.Row>
          <S.LabelText>이름</S.LabelText>
          <div>
            <S.Input
              type="text"
              name="name"
              pattern="^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{0,10}$"
              onChange={onChangeOrdererInfo}
              value={ordererInfo.name}
              autoComplete="off"
            />
            <S.ErrorText>* 정확한 이름을 입력해 주세요.</S.ErrorText>
          </div>
        </S.Row>
        <S.Row>
          <S.LabelText>휴대폰번호</S.LabelText>
          <div>
            <SelectInput
              selectItems={phoneSelect}
              onClick={(selected: string) => {
                console.log(selected);
                setOrdererInfo({ ...ordererInfo, ["phone1"]: selected });
              }}
              checkItem={ordererInfo.phone1}
              width="100px"
              padding="10px 6px"
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
          </div>
        </S.Row>
        <S.Row>
          <S.LabelText>이메일</S.LabelText>
          <div>
            <S.Input
              type="email"
              name="email"
              onChange={onChangeOrdererInfo}
              pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
              autoComplete="off"
            />
            <S.ErrorText>* 이메일 형식을 확인해주세요</S.ErrorText>
          </div>
        </S.Row>
      </section>
      <section>
        <S.SectionTitle>
          <strong>배송지 정보</strong>
          <NormalBtn size="ssmall" color="white" width="160px" onClick={handleSameInfoBtn}>
            주문자 정보와 동일
          </NormalBtn>
        </S.SectionTitle>
        <S.Row>
          <S.LabelText>수령인</S.LabelText>
          <div>
            <S.Input
              name="name"
              type="text"
              pattern="^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{0,10}$"
              onChange={onChangeReceiverInfo}
              value={receiverInfo.name}
              autoComplete="off"
            />
            <S.ErrorText>* 정확한 이름을 입력해 주세요.</S.ErrorText>
          </div>
        </S.Row>
        <S.Row>
          <S.LabelText>휴대폰번호</S.LabelText>
          <div>
            <SelectInput
              selectItems={phoneSelect}
              onClick={(selected: string) =>
                setReceiverInfo({ ...receiverInfo, ["phone1"]: selected })
              }
              checkItem={receiverInfo.phone1}
              padding="9px 10px"
              width="100px"
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
          </div>
        </S.Row>
        <S.Row>
          <S.LabelText>배송주소</S.LabelText>
          <div>
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
          </div>
        </S.Row>
        <S.Row>
          <S.LabelText>배송 메세지</S.LabelText>
          <SelectInput
            selectItems={messageSelect}
            onClick={(selected: string) =>
              setReceiverInfo({ ...receiverInfo, ["message"]: selected })
            }
            checkItem={receiverInfo.message}
            width="600px"
            padding="9px 10px"
            textAlign="start"
          />
        </S.Row>
      </section>
    </section>
  );
}

export default DeliveryInfo;
