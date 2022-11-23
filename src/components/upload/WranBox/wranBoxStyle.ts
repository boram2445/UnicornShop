import styled from "styled-components";

const Title = styled.h4`
  color: var(--color-red);
  font-size: 1.6rem;
  line-height: 2rem;
`;

const Content = styled.div`
  margin-top: 10px;
  padding: 20px;
  font-size: 1.4rem;
  line-height: 1.8rem;
  background-color: var(--color-yellow);
  p {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export { Title, Content };
