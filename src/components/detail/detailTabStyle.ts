import styled from "styled-components";

const TabSection = styled.div`
  margin: 100px auto 200px;
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
  margin-top: 50px;
  width: 100%;
  height: 500px;
  line-height: 500px;
  text-align: center;
  background-color: var(--color-brightGrey);
  color: var(--color-grey);
  font-size: 4rem;
`;

export { TabSection, TabWrap, TabContent };
