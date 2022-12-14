import styled from "styled-components";

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 80px 80px;
  gap: 20px;
  align-items: center;
  padding: 10px 30px 11px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-grey);
`;

const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ImageBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--color-grey);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductText = styled.p`
  font-size: 1.6rem;
  line-height: 2rem;
`;

const StockText = styled.p`
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-grey);
`;

const PriceText = styled.p`
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.2rem;
  font-weight: 500;
`;

export { ItemContainer, InfoWrap, ImageBox, InfoBox, ProductText, StockText, PriceText };
