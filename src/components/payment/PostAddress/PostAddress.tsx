import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import DaumPostcode from "react-daum-postcode";
import * as S from "./postAddressStyle";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import { useAppDispatch } from "../../../hooks";

type PostAddressProps = {
  getAddress: (zoneCode: string, address: string) => void;
  closeModal: () => void;
};

function PostAddress({ getAddress, closeModal }: PostAddressProps) {
  const dispatch = useAppDispatch();
  const background = useRef() as React.MutableRefObject<HTMLInputElement>;

  //모달창 떴을때 스크롤 방지 - 모달 컴포넌트와 중복
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  //배경화면 클릭시 모달창 닫기
  const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
    if (background.current === e.target) {
      closeModal();
    }
  };

  const onCompletePost = (data: any) => {
    let fullAddr = data.address;
    let extraAddr = "";
    //도로명 타입
    if (data.addressType === "R") {
      //법정동명
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      //건물명 or 주택명
      if (data.buildingName !== "") {
        extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    getAddress(data.zonecode, fullAddr);
    closeModal();
  };

  const customStyles = {
    width: "100%",
    height: "100%",
  };

  return ReactDOM.createPortal(
    <S.ModalBackGround ref={background} onClick={onBackgroundClick}>
      <S.ModalWrapper>
        <S.CloseBtn onClick={closeModal}>
          <img src={deleteIcon} />
        </S.CloseBtn>
        <DaumPostcode autoClose onComplete={onCompletePost} style={customStyles} />
      </S.ModalWrapper>
    </S.ModalBackGround>,
    document.getElementById("portal")!
  );
}

export default PostAddress;
