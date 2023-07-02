import styled from "styled-components";
import {
  ImageBox,
  ProductInfoBox,
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
  ImageBox,
  ProductInfoBox,
  TitleText,
  PriceText,
  ShipText,
  RightContainer,
  MarketText,
  StockText,
  DateText,
};
