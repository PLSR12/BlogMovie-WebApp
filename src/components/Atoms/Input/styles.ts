import styled from 'styled-components'

export const Container = styled.div`
  label {
    display: block;
    padding: 0 0 8px 0;
    font-family: var(--font-system-primary);
    font-size: 13px;
    font-weight: 600;
    color: var(--color-neutral-black);
    letter-spacing: 0em;
    text-align: left;
    margin-top: 20px;
  }
  input {
    height: 38px;
    width: 100%;
    padding: 14px 12px;
    border-radius: var(--border-radius-small);
    border: 1px solid #ced4da;

    overflow: hidden;
    text-overflow: ellipsis;

    font-size: var(--font-size-medium);

    &:hover::placeholder {
      color: var(--color-neutral-500);
    }

    &:hover {
      border-color: var(--color-neutral-black);
    }

    &::placeholder {
      color: var(--color-neutral-400);
    }

    &:focus {
      border: var(--border-width-small) solid var(--color-neutral-black);
    }

    &:disabled {
      background-color: #dcd4d4;
    }
  }

  div {
    color: var(--color-primary-first-light);
    margin: 5px 0 0 5px;
  }
`
