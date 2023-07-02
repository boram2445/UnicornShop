import React, { useEffect, useRef } from "react";
import * as S from "./ArrowModalStyle";

interface ArrowModalProps {
  isOpen: boolean;
  onModal: (value: boolean) => void;
  list: {
    label: string;
    onClick: () => void;
  }[];
  btnRef: React.MutableRefObject<HTMLButtonElement>;
}

function ArrowModal({ isOpen, onModal, list, btnRef }: ArrowModalProps) {
  const modalRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!(btnRef.current?.contains(target as Node) || modalRef.current?.contains(target as Node)))
      onModal(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <S.Container ref={modalRef}>
      <S.Arrows type="border" />
      <S.Arrows type="arrow" />
      <S.BtnWrap>
        {list.map((item, index) => (
          <S.ModalBtn
            type="button"
            key={index}
            onClick={() => {
              item.onClick();
              onModal(false);
            }}
          >
            {item.label}
          </S.ModalBtn>
        ))}
      </S.BtnWrap>
    </S.Container>
  );
}

export default ArrowModal;
