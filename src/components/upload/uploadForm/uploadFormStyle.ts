import styled from "styled-components";
import { Label } from "../InputBox/inputBoxStyle";

const UploadForm = styled.form`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
`;

const TitleBtnWrap = styled.div`
  grid-column: span 2;
  display: flex;
  gap: 10px;
  justify-content: end;
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

export { UploadForm, TitleBtnWrap, InputsWrap, BtnWrap, Label, DetailWrap, ItemDetail };
