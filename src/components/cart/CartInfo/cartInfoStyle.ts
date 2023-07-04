import styled from "styled-components";

const CartInfoBox = styled.div`
  position: relative;
  margin: 5.2rem auto 3.2rem;
  width: 100%;
  height: 5.5rem;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  padding: 1.8rem 8rem 1.8rem 9rem;
  background-color: var(--color-brightGrey);
  border-radius: 1rem;
  & > input {
    transform: translateY(-60%);
  }
  strong {
    font-size: 1.8rem;
    text-align: center;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 600px) {
    & > input {
      left: 1.5rem;
    }
  }
`;

export { CartInfoBox };
