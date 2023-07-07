import styled from "styled-components";

const WranArticle = styled.article`
  min-width: 15rem;
`;

const Title = styled.h4`
  color: var(--color-red);
  font-size: 1.6rem;
  line-height: 2.2rem;
`;

const Content = styled.div`
  margin-top: 1rem;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 1.8rem;
  background-color: var(--color-yellow);
  p {
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export { WranArticle, Title, Content };
