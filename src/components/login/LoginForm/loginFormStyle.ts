import styled from "styled-components";

const LoginSection = styled.section`
  position: relative;
`;

const LoginForm = styled.form`
  margin-top: 60px;
  padding: 35px 34px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
  border-radius: 0 0 10px 10px;
`;

const LoginInput = styled.input`
  margin: 3px auto;
  height: 60px;
  padding: 0 8px;
  width: 480px;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2rem;
  border: none;
  border-bottom: 1px solid var(--color-grey);
  &::placeholder {
    font-weight: 400;
    color: var(--color-grey);
  }
  &:focus {
    border-bottom: 2px solid var(--color-main);
    outline: none;
  }
  &:nth-child(2) {
    margin-bottom: 26px;
  }
`;

const ErrorText = styled.small`
  margin-bottom: 26px;
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--color-red);
`;

export { LoginSection, LoginForm, LoginInput, ErrorText };
