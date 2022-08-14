import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  height: 100vh;
  align-items: center;
  background-color: var(--color-secondary-first-main);

  @media (max-width: 812px) {
    display: flex;
    background-color: var(--color-background-paper);
  }
`

export const ContainerImg = styled.div`
  display: inline;
  justify-content: center;
  flex-direction: row;
  gap: 40px;
  hr {
    background: black;
    height: 120px;
    width: 3px;
  }

  .logo-burger-king {
    width: 14vh;
    height: 12vh;
    margin-left: 125px;
  }

  .logo-popeyes {
    width: 100%;
    margin-left: -105px;
  }

  @media (max-width: 812px) {
    gap: 20px;

    .logo-burger-king {
      width: 14vh;
      height: 11vh;
      margin-left: 125px;
    }

    .logo-popeyes {
      width: 90%;
      margin-left: -105px;
    }
  }
`

export const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  small {
    padding-top: 32px;
    color: var(--color-neutral-700);
    font-size: var(--font-size-samll);
    font-weight: var(--font-weight-medium);
  }

  @media (max-width: 812px) {
    padding: 10%;
    background: var(--color-background-paper);
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 374px;
  border-radius: var(--border-radius-medium);
  padding: 32px;
  background: var(--color-background-paper);
  box-shadow: var(--shadow-level-3);

  @media (max-width: 812px) {
    background-color: var(--color-background-paper);
    box-shadow: none;
    padding: 0;
    width: 100%;
  }

  label {
    margin-top: -16px;
    margin-left: 8px;
    color: var(--color-neutral-500);
    font-family: var(--font-system-primary);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-standard);
    letter-spacing: 0em;
    text-align: left;
  }

  div {
    display: flex;
    justify-content: center;
    display: flex;
    align-items: center;

    position: relative;
    flex: 1 1 0%;

    &:focus-within > svg {
      fill: var(--color-primary-second-main);
    }

    svg {
      position: absolute;
      left: 12px;
      top: 15px;
    }

    span {
      position: absolute;
      right: 0;
      cursor: pointer;

      .iconVisiblity {
        position: relative;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-12px) translateY(-16px);
        transition: all 0.5s ease;

        :hover {
          fill: var(--color-neutral-500);
        }
      }
    }

    input[type='email'] {
      padding-right: 12px;
    }

    .inputError {
      border: 2px solid red;
    }

    input {
      height: 48px;
      width: 310px;
      padding: 0 42px;
      margin-top: 2px;
      margin-bottom: 40px;
      border-radius: var(--border-radius-small);
      border: var(--border-width-small) solid var(--color-neutral-500);

      font-size: var(--font-size-medium);

      &:hover::placeholder {
        color: var(--color-neutral-500);
      }

      &:hover {
        border-color: var(--color-primary-second-main);
      }

      &::placeholder {
        color: var(--color-neutral-400);
      }

      &:focus {
        border: var(--border-width-thick) solid var(--color-primary-second-main);
      }

      @media (max-width: 812px) {
        flex: 1;
      }
    }
  }

  > p {
    margin: -35px 0 35px 0;
    color: red;
    font-size: 14px;

    &::before {
      display: inline;
      content: '⚠ ';
    }
  }

  button {
    height: 48px;
    width: 310px;
    font-family: var(--font-system-primary);
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-medium);
    background: var(--color-primary-first-darker);
    color: var(--color-secondary-first-main);

    border: var(--border-width-none);
    border-radius: var(--border-radius-small);
    margin-bottom: 40px;
    padding: 13px 16px 13px 16px;
    transition: all 0.5s ease;

    &:hover {
      background: var(--color-primary-first-main);
    }

    @media (max-width: 812px) {
      width: 100%;
    }
  }

  a {
    font-size: var(--font-size-standard);
    font-weight: var(--font-weight-medium);
    text-align: center;
    align-self: center;
    color: var(--color-primary-first-darker);
    padding: 5px 15px;
    width: fit-content;

    :hover {
      color: var(--color-secondary-first-main);
      background: var(--color-primary-first-main);
      border-radius: var(--border-radius-nano);
    }
  }
`

export const ContainerHeaderForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    height: 97.6px;
  }

  p {
    font-weight: var(--font-weight-standard);
    font-size: var(--font-size-large);
    color: var(--color-secondary-second-main);
    margin: 0 0 20px 0;
  }
`
