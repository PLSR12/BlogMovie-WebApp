import styled from 'styled-components';

export const Container = styled.div``;

export const ThumbUserLogged = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 6px;

  background-color: #e9ffe2;
  border-radius: var(--border-radius-pill);
  border: none;
  border: 1px solid var(--color-neutral-400);
  cursor: pointer;

  p {
    font-size: var(--font-size-standard);
    font-weight: var(--font-weight-medium);
    color: var(--color-secondary-second-main);
  }

  &:hover {
    background-color: #d0e9c8;
  }
`;

export const NavProfileOpitions = styled.div<{ isVisible: boolean }>`
  position: absolute;
  width: 250px;
  left: calc(100% - 270px);
  top: calc(100% + 5px);
  background: var(--color-background-paper);
  border-radius: var(--border-radius-medium);
  box-shadow: var(--shadow-level-4);
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  z-index: 100;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  & a:hover,
  .btnLogout:hover {
    background: var(--color-primary-first-main);

    svg {
      path {
        fill: #fff;
      }
    }

    p {
      color: #fff;
    }
  }
`;

export const HeaderProfile = styled.div`
  border-bottom: 1px solid var(--color-neutral-200);
  padding: 16px;

  h4 {
    font-weight: var(--font-weight-medium);
    font-size: 13px;
    color: var(--color-neutral-700);
    margin-bottom: 8px;
  }

  p {
    font-size: var(--font-size-small);
    color: var(--color-neutral-500);
  }
`;

export const BodyProfile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  a {
    display: flex;
    align-items: center;
    flex: 1;
    border: none;
    padding: 10px 16px;
    cursor: pointer;

    p {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-standard);
      color: var(--color-neutral-700);
      padding-left: 6px;
    }
  }

  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 10px 16px;
    opacity: 0.5;
    cursor: not-allowed;

    p {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-standard);
      color: var(--color-neutral-700);
      padding-left: 6px;
    }
  }
`;

export const FooterProfile = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-neutral-200);
  padding: 8px 0;

  button {
    display: flex;
    align-items: center;
    flex: 1;
    padding-right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 16px;

    p {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-standard);
      color: var(--color-neutral-700);
      padding-left: 6px;
    }
  }
`;
