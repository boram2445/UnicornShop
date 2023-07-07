import styled from "styled-components";
import { Label } from "../InputBox/inputBoxStyle";

const UploadForm = styled.form`
  display: grid;
  grid-template-columns: 30rem 1fr;
  gap: 4rem;

  @media screen and (max-width: 760) {
    display: flex;
    flex-direction: column;
  }
`;

const TitleBtnWrap = styled.div`
  grid-column: span 2;
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

const InputsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const BtnWrap = styled.div`
  display: grid;
  grid-template-columns: 16rem 16rem auto;
  gap: 1rem;
  & > label {
    grid-column: 1/-1;
  }
`;

const DetailWrap = styled.div`
  grid-column: span 2;
`;

const TextArea = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  height: 30rem;
  padding: 10px;
  font-size: 1.5rem;
  line-height: 2.5rem;
  resize: none;
  border: 1px solid var(--color-grey);

  &::placeholder {
    color: var(--color-grey);
  }
`;

export { UploadForm, TitleBtnWrap, InputsWrap, BtnWrap, Label, DetailWrap, TextArea };
