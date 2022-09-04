import styled from 'styled-components';

export const ContainerBread = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: var(--font-size-standard);
    color: var(--color-secondary-second-main);
    margin-right: 5px;
  }

  svg {
    font-size: 20px;
    fill: var(--color-neutral-400);
  }

  .item {
    display: flex;
    align-items: center;

    .currentPage {
      font-size: var(--font-size-standard);
      color: var(--color-neutral-700);
      padding: 6px;
      font-weight: var(--font-weight-medium);
      background-color: var(--color-neutral-200);
      border-radius: var(--border-radius-small);
      margin-left: 5px;
    }

    &:last-child {
      svg {
        display: none;
      }
    }
  }
`;
