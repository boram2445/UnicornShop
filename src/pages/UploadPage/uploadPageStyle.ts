import styled from "styled-components";
import { Container, TitleWrap, TitleText, ContentWrap } from "../CenterPage/centerPageStyle";

const ContentWrapper = styled(ContentWrap)`
  margin-top: 0;
  grid-template-columns: 0.3fr 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export { Container, LeftWrapper, TitleWrap, TitleText, ContentWrapper };
