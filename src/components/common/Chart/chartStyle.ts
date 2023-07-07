import styled from "styled-components";
import { NoItemBox } from "../../../pages/CartPage/cartPageStyle";

const ChartContainer = styled.div`
  height: 50rem;
  display: grid;
  grid-template-rows: 4.5rem auto;
  padding-bottom: 5px;
  border-radius: 10px;
  border: 1px solid var(--color-grey);
  background-color: var(--color-brightGrey);
`;

const TopWrap = styled.div`
  padding: 1.1rem 5rem 1.1rem 3rem;
  display: grid;
  grid-template-columns: 5fr 2fr 8rem 8rem;
  gap: 20px;
  border-radius: 1rem 1rem 0 0;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-grey);
  strong {
    font-size: 1.6rem;
    line-height: 2.2rem;
    text-align: center;
  }

  @media screen and (max-width: 900px) {
    strong:nth-child(2) {
      display: none;
    }
    grid-template-columns: 1fr 8rem 8rem;
  }
`;

const ListWrap = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export { ChartContainer, TopWrap, ListWrap, NoItemBox };
