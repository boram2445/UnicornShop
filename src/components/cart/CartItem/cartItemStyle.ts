import styled from "styled-components";
import DeleteIcon from "../../../assets/icons/icon-delete.svg";

const CartItemArticle = styled.article`
  margin-top: 0.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  padding: 1.9rem 8rem 1.8rem 9rem;
  border: 0.2rem solid var(--color-brightGrey);
  border-radius: 1rem;
  position: relative;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.9rem 1.5rem 1.8rem 1.5rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 4rem;
    & > input {
      top: 1.8rem;
      left: 1.5rem;
    }
  }
`;

const LeftWrap = styled.div`
  display: flex;
`;

const RightWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }

  div {
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      margin: 0;
    }
  }
`;

const ImageBox = styled.div<{ imgUrl?: string }>`
  margin-right: 3.6rem;
  width: 16rem;
  height: 16rem;
  border-radius: 1rem;
  background: url(${({ imgUrl }) => imgUrl}) no-repeat center;
  background-size: cover;
`;

const ShopText = styled.p`
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: var(--color-darkGrey);
`;

const ProductText = styled.strong`
  display: block;
  margin: 10px auto;
  font-size: 1.8rem;
  line-height: 2.2rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PriceText = styled.p`
  margin-bottom: 4rem;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 700;
`;

const ShipText = styled(ShopText)``;

const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.8rem;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const PriceAllText = styled.p`
  font-size: 1.8rem;
  line-height: 2.3rem;
  color: var(--color-red);
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 2.2rem;
  height: 2.2rem;
  background: url(${DeleteIcon}) no-repeat center;
  background-size: cover;
  cursor: pointer;
`;

export {
  CartItemArticle,
  LeftWrap,
  RightWrap,
  ImageBox,
  ShopText,
  ProductText,
  PriceText,
  ShipText,
  PriceAllText,
  OrderBox,
  DeleteBtn,
};
