import styled from "styled-components";

const JoinFormSection = styled.section`
  position: relative;
  width: 55rem;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:nth-child(2) {
    margin: 3.4rem auto;
    width: 48rem;
  }
`;

const InputBoxs = styled.div`
  margin-top: 6rem;
  padding: 3rem 3.6rem;
  border: 1px solid var(--color-grey);
  border-radius: 0 0 1rem 1rem;
  & > div {
    margin-bottom: 1.2rem;
  }
  div:nth-child(3) {
    margin-bottom: 5rem;
  }
`;

export { JoinFormSection, InputBoxs, JoinForm };
