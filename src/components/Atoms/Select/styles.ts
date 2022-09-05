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
  }

  select {
    display: block;
    height: 38px;
    width: 100%;
    padding: 8px 12px;
    border-radius: var(--border-radius-small);
    border: 1px solid #ced4da;

    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat !important;
    background-position: right 0.75rem center !important;
    background-size: 16px 12px !important;
    appearance: none;
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
  }

  div {
    color: var(--color-primary-first-light);
    margin: 5px 0 0 5px;
  }
`

export const Error = styled.div`
  color: var(--color-primary-first-light);
  margin: 5px 0 0 5px;
`
