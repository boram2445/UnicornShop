import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { closeModal, selectBtnText } from "../../../features/modalSlice";
import { NormalBtn } from "../Button/Button";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import * as S from "./modalStyle";
interface ModalProps {
  children: React.ReactNode;
  onClickYes: () => void;
}

function Modal({ children, onClickYes }: ModalProps) {
  const dispatch = useAppDispatch();
  const backgroundRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const BtnText = useAppSelector(selectBtnText);

  //모달창 떴을때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  //배경화면 클릭시 모달창 닫기
  const onBackgroundClick = (e: React.MouseEvent<HTMLElement>) => {
    if (backgroundRef.current === e.target) {
      dispatch(closeModal());
    }
  };

  const handleYesBtn = () => {
    onClickYes();
    dispatch(closeModal());
  };

  return ReactDOM.createPortal(
    <S.ModalBackGround ref={backgroundRef} onClick={onBackgroundClick}>
      <S.ModalContainer>
        <S.CloseBtn type="button" onClick={() => dispatch(closeModal())}>
          <img src={deleteIcon} />
        </S.CloseBtn>
        <S.ModalText>{children}</S.ModalText>
        <S.BtnWrap>
          <NormalBtn
            width="10rem"
            color="white"
            fontSize="1.5rem"
            padding="0.6rem"
            onClick={() => dispatch(closeModal())}
          >
            {BtnText.no}
          </NormalBtn>
          <NormalBtn width="10rem" fontSize="1.5rem" padding="0.6rem" onClick={handleYesBtn}>
            {BtnText.yes}
          </NormalBtn>
        </S.BtnWrap>
      </S.ModalContainer>
    </S.ModalBackGround>,
    document.getElementById("portal")!
  );
}

export default Modal;
