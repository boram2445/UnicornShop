import styled from "styled-components";

const CartPageLayout = styled.section`
  margin: 54px auto 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartPageText = styled.h2`
  font-size: 3.6rem;
  line-height: 4.4rem;
  font-weight: 700;
`;

const CartInfoBox = styled.div`
  position: relative;
  margin: 52px auto 32px;
  width: 1280px;
  padding: 19px 0 18px;
  background-color: #f2f2f2;
  border-radius: 10px;
  strong {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }
`;

const RadioBtn = styled.input`
  appearance: none;
  height: 20px;
  width: 20px;
  display: block;
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 2px solid #fa897b;
  &:after {
    content: "";
    height: 12px;
    width: 12px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: #fa897b;
    border-radius: 50%;
    transition: 100ms ease-in-out 0s;
  }
  &:checked {
    &:after {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const CartList = styled.ul``;

export { CartPageLayout, CartPageText, CartInfoBox, RadioBtn, CartList };
