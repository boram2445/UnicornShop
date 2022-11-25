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

const TextArea = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 300px;
  padding: 10px;
  font-size: 1.4rem;
  line-height: 2rem;
  resize: none;
  border: 1px solid var(--color-grey);

  & ::placeholder {
    color: var(--color-grey);
  }
`;

export { UploadForm, TitleBtnWrap, InputsWrap, BtnWrap, Label, DetailWrap, TextArea };
