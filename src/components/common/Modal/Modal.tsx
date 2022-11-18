import React from "react";
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
  const BtnText = useAppSelector(selectBtnText);

  return ReactDOM.createPortal(
    <S.ModalBackGround>
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
