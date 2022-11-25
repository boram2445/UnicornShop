import styled from "styled-components";
import { Container, TitleWrap, TitleText, ContentWrap } from "../CenterPage/centerPageStyle";

const ContentWrapper = styled(ContentWrap)`
  margin-top: 0;
  grid-template-columns: 280px 1fr;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export { Container, LeftWrapper, TitleWrap, TitleText, ContentWrapper };
