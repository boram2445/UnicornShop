import styled from "styled-components";

const TabSection = styled.div`
  margin: 10rem auto 20rem;
  grid-column: span 2;
  width: 100%;
`;

const TabWrap = styled.div`
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const TabContent = styled.div`
  margin-top: 5rem;
  width: 100%;
  height: 50rem;
  line-height: 50rem;
  text-align: center;
  background-color: var(--color-brightGrey);
  color: var(--color-grey);
  font-size: 4rem;

  @media screen and (max-width: 768px) {
    margin-top: 3rem;
  }
`;

export { TabSection, TabWrap, TabContent };
