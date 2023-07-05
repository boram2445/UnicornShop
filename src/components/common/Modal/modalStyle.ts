import styled from "styled-components";

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0 3.2rem 0;
  gap: 4rem;
  width: 34.5rem;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-dark);
  background-color: var(--color-white);
  z-index: 1000;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.2rem;
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

export { ModalBackGround, ModalContainer, CloseBtn, ModalText, BtnWrap };
