import styled from 'styled-components';

export const ModalContent = styled.div``;

export const Title = styled.h2`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-large);
  color: var(--color-neutral-700);
`;

export const Text = styled.div`
  font-weight: var(--font-weight-standard);
  font-size: var(--font-size-medium);
  line-height: 136%;
  color: #000000;
  margin: 40px 0;
`;

export const ButtonsArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-neutral-200);
  padding-top: 20px;
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  color: var(--color-primary-first-dark);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-standard);
  width: 170px;
  height: 40px;
  border-radius: var(--border-radius-small);
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary-first-main);
    color: var(--color-neutral-white);
  }
`;

export const ModalContentLoading = styled.div`
  h2 {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-large);
    color: var(--color-neutral-700);
  }

  p {
    font-weight: var(--font-weight-standard);
    font-size: var(--font-size-medium);
    line-height: 136%;
    color: #000000;
    margin: 40px 0;
  }

  img {
    width: 30%;
    margin-left: 35%;
    margin-right: 35%;
  }
`;
