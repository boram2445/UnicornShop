import styled from "styled-components";
import { Container, TitleWrap, TitleText, ContentWrap } from "../CenterPage/centerPageStyle";
import { Label } from "../../components/upload/InputBox/inputBoxStyle";

const ContentWrapper = styled(ContentWrap)`
  grid-template-columns: 280px 1fr;
`;

const TitleBtnWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const RightWrap = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
`;

const InputsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BtnWrap = styled.div`
  display: grid;
  grid-template-columns: 220px 220px auto;
  gap: 10px;
  & > label {
    grid-column: 1/-1;
  }
`;

const DetailWrap = styled.div`
  grid-column: span 2;
`;

const ItemDetail = styled.div`
  margin-top: 10px;
  background-color: var(--color-brightGrey);
  border: 1px solid var(--color-grey);
  width: 100%;
  height: 300px;
  font-size: 4rem;
  color: var(--color-grey);
  text-align: center;
  line-height: 300px;
`;

export {
  Container,
  TitleWrap,
  TitleText,
  ContentWrapper,
  Label,
  TitleBtnWrap,
  RightWrap,
  InputsWrap,
  BtnWrap,
  DetailWrap,
  ItemDetail,
};
