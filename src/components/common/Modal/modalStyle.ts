import styled from "styled-components";

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 360px;
  height: 200px;
  border: 2px solid var(--color-grey);
  background-color: var(--color-white);
  z-index: 1000;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 1.6rem;
  line-height: 2rem;
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
`;

export { ModalBackGround, ModalContainer, CloseBtn, ModalText, BtnWrap };
