import styled from "styled-components";

const ProductItem = styled.li`
  cursor: pointer;
`;

const ThumbContainer = styled.div<{ image: string }>`
  position: relative;
  padding-top: 100%;
  background: url(${({ image }) => image}) no-repeat center;
  background-size: cover;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  div {
    display: none;
  }
  &:hover {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      display: block;
      width: 100%;
      height: 100%;
      color: black;
      border-radius: 10px;
    }
    div {
      display: block;
      display: flex;
      gap: 15px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: red;
      z-index: 50;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const SellerText = styled.p`
  color: #767676;
  font-size: 1.6rem;
  line-height: 2.2rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const TextWrap = styled.div`
  margin-top: 10px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 22px;
`;

const PriceText = styled.strong`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3rem;
`;

const WonText = styled.span`
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 400;
`;

export { ProductItem, ThumbContainer, TextWrap, SellerText, ProductText, PriceText, WonText };
