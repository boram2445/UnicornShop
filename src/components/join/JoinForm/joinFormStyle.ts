import styled from "styled-components";

const JoinFormSection = styled.section`
  position: relative;
  width: 550px;
`;

const JoinForm = styled.form`
  margin-top: 60px;
  padding: 35px 34px;
  border: 1px solid var(--color-grey);
  border-radius: 0 0 10px 10px;
  div {
    margin-bottom: 12px;
  }
  div:nth-child(3) {
    margin-bottom: 50px;
  }
  div:first-child input {
    margin-right: 10px;
  }
`;

export { JoinFormSection, JoinForm };
