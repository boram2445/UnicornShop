import styled from "styled-components";

const TotalPriceBox = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3.4rem 1fr 3.4rem 1fr 1fr;
  align-items: center;
  margin: 4rem auto 4rem;
  padding: 4.4rem 0 4.2rem;
  width: 100%;
  background-color: var(--color-brightGrey);
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1.5rem 0.8fr 1.5rem 1fr;
    margin-bottom: 9rem;
  }
`;

const PriceBox = styled.div`
  text-align: center;
  &:last-child {
    @media screen and (max-width: 768px) {
      position: absolute;
      right: 0;
      bottom: -6rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
  }
`;

const TitleText = styled.p<{ type?: string }>`
  margin-bottom: 1.2rem;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: ${({ type }) => (type ? "700" : "400")};

  @media screen and (max-width: 768px) {
    margin: 0;
  }
`;

const IconCircle = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: 50%;
`;

const ResultText = styled.p`
  font-size: 2.4rem;
  line-height: 3rem;
  font-weight: 700;
  span {
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 400;
  }
`;

const FinalText = styled.strong`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4.5rem;
  color: var(--color-red);
  span {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.2rem;
  }
`;

export { TotalPriceBox, PriceBox, TitleText, IconCircle, ResultText, FinalText };
