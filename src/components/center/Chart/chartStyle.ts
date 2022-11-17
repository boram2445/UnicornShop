import styled from "styled-components";

const ChartContainer = styled.div`
  height: 65vh;
  overflow-y: auto;
  border: 1px solid var(--color-grey);
  background-color: var(--color-brightGrey);
  border-radius: 10px;
  strong {
    font-size: 1.8rem;
    line-height: 2.2rem;
    text-align: center;
  }
`;

const TopWrap = styled.div`
  padding: 22px 30px;
  display: grid;
  grid-template-columns: 5fr 2fr 80px 80px;
  gap: 20px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-grey);
`;

export { ChartContainer, TopWrap };
