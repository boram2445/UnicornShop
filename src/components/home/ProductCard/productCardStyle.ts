import styled, { css } from "styled-components";
import { DateText, StockText } from "../../search/productListCard/productListCardStyle";
import { ShipText } from "../../cart/CartItem/cartItemStyle";

const ProductItem = styled.li`
  padding: 1rem 1rem 1.5rem 1rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-light);
  transition: var(--transition-smooth);
  cursor: pointer;
  &:hover {
    background-color: var(--color-brightGrey);
  }
`;

const ThumbContainer = styled.div<{ image: string; stock: number }>`
  position: relative;
  padding-top: 100%;
  background: url(${({ image }) => image}) no-repeat center;
  background-size: cover;
  border-radius: 1rem 1rem 0 0;

  ${({ stock }) => {
    if (stock === 0) {
      return css`
        ::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          display: block;
          width: 100%;
          height: 100%;
          color: black;
          border-radius: 10px;
        }
      `;
    }
  }}
`;

const TextWrap = styled.div`
  padding: 1rem 0.8rem;
  display: grid;
`;

const SellerText = styled.p`
  justify-self: end;
  font-size: 1.6rem;
  color: var(--color-main);
`;

const ProductText = styled.p`
  margin: 0.8rem 0 0.6rem 0;
  font-size: 1.8rem;
`;

const PriceText = styled.strong`
  margin-top: 0.2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const WonText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
`;

const DescriptionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  & > small {
    margin-top: 0.2rem;
    margin: 0;
    font-size: 1.1rem;
    align-self: flex-end;
  }
  & > div {
    margin-top: 0.7rem;
    text-align: end;
    & > p {
      margin-top: 0.4rem;
    }
  }
`;

export {
  ProductItem,
  ThumbContainer,
  TextWrap,
  SellerText,
  ProductText,
  PriceText,
  WonText,
  DateText,
  ShipText,
  StockText,
  DescriptionWrap,
};
