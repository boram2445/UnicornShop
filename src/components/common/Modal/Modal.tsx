import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { NormalBtn } from "../Button/Button";
import * as S from "./modalStyle";
import deleteIcon from "../../../assets/icons/icon-delete.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { closeModal, selectBtnText } from "../../../features/modalSlice";

interface ModalProps {
  children: React.ReactNode;
  onClickYes: () => void;
}

function Modal({ children, onClickYes }: ModalProps) {
  const dispatch = useAppDispatch();
  const background = useRef() as React.MutableRefObject<HTMLInputElement>;
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
    if (background.current === e.target) {
      dispatch(closeModal());
    }
  };

  return ReactDOM.createPortal(
    <S.ModalBackGround ref={background} onClick={onBackgroundClick}>
      <S.ModalContainer>
        <S.CloseBtn onClick={() => dispatch(closeModal())}>
          <img src={deleteIcon} />
        </S.CloseBtn>
        <S.ModalText>{children}</S.ModalText>
        <S.BtnWrap>
          <NormalBtn
            size="ssmall"
            width="100px"
            color="white"
            onClick={() => dispatch(closeModal())}
          >
            {BtnText.no}
          </NormalBtn>
          <NormalBtn size="ssmall" width="100px" onClick={onClickYes}>
            {BtnText.yes}
          </NormalBtn>
        </S.BtnWrap>
      </S.ModalContainer>
    </S.ModalBackGround>,
    document.getElementById("portal")!
  );
}

export default Modal;
