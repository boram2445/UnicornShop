import styled, { css } from "styled-components";
import {
  ImageBox,
  LeftWrap as ProductInfoBox,
  ProductText,
  PriceText,
  ShipText,
} from "../../cart/CartItem/cartItemStyle";

const ListItem = styled.li`
  margin: 1.5rem 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--color-brightGrey);
  border-radius: 2rem;
  box-shadow: var(--shadow-light);
  transition: var(--transition-smooth);
  cursor: pointer;
  &:hover {
    background-color: var(--color-brightGrey);
  }
`;

const ThumbContainer = styled(ImageBox)<{ stock: number }>`
  position: relative;
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

const TitleText = styled(ProductText)`
  margin: 0.5rem 0;
`;

const RightContainer = styled.div`
  padding: 2rem;
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--color-brightGrey);
  font-size: 1.4rem;
`;

const MarketText = styled.p`
  margin-bottom: 1.5rem;
  strong {
    color: var(--color-main);
    font-size: 2.2rem;
    font-weight: 600;
  }
`;

const StockText = styled.p<{ stock: number }>`
  color: ${({ stock }) => (stock === 0 ? "#EB5757" : "#767676")};
`;

const DateText = styled.small`
  margin-top: 4rem;
  color: var(--color-darkGrey);
`;

export {
  ListItem,
  ThumbContainer,
  ProductInfoBox,
  TitleText,
  PriceText,
  ShipText,
  RightContainer,
  MarketText,
  StockText,
  DateText,
};
