import styled from "styled-components";

const LoginSection = styled.section`
  position: relative;
`;

const LoginForm = styled.form`
  margin-top: 6rem;
  padding: 2.5rem 3.4rem 3.5rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
  border-radius: 0 0 1rem 1rem;
`;

const LoginInput = styled.input`
  margin: 0.3rem auto;
  height: 6rem;
  padding: 0 0.8rem;
  width: 48rem;
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
    margin-bottom: 2.6rem;
  }
`;

const ErrorText = styled.small`
  margin-bottom: 2.6rem;
  font-size: 1.6rem;
  color: var(--color-red);
`;

export { LoginSection, LoginForm, LoginInput, ErrorText };
