import styled from 'styled-components'

export const ContainerTable = styled.div`
  width: 100%;

  .MuiIconButton-label {
    display: flex;
    align-items: inherit;
    justify-content: inherit;
  }

  .MuiPaper-root {
    width: 100%;
    padding: 20px;
    box-shadow: none;
    background: var(--color-background-paper);
    border-radius: var(--border-radius-medium);
    border: var(--border-width-small) solid var(--color-neutral-200);

    /* spinner load table */
    .MuiCircularProgress-colorPrimary {
      color: var(--color-primary-first-dark);

      &:hover {
        color: var(--color-primary-first-main);
      }
    }

    .MuiCheckbox-colorSecondary.Mui-checked {
      color: var(--color-primary-first-dark);

      &:hover {
        background-color: transparent !important;
      }
    }
  }

  .MuiToolbar-root {
    padding: 0;

    .MuiInputAdornment-root.MuiInputAdornment-positionEnd {
      .MuiIconButton-root.Mui-disabled {
        display: none;
      }
    }
  }

  /* header table */
  .MuiToolbar-regular.MuiToolbar-gutters {
    & :nth-child(3) {
      order: 2;
      margin-left: 5px;
    }

    .MuiTypography-h6 {
      color: var(--color-neutral-700);
    }

    .MuiTextField-root {
      .material-icons {
        color: var(--color-neutral-400);
      }
    }

    button {
      color: var(--color-neutral-700);

      p {
        padding-left: 5px;
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-standard);
      }

      &:hover {
        background: transparent;
      }
    }
  }

  .MuiFormControl-root {
    display: flex;
    justify-content: center;
    border: 1px solid var(--color-neutral-500);
    background: var(--color-background-paper);
    border-radius: 4px;
    height: 48px;
    padding-right: 20px;

    input {
      font-size: 16px;
      color: var(--color-neutral-500);
    }
  }

  .MuiInput-underline {
    &::before,
    ::after {
      display: none;
    }
  }

  .MuiTableRow-root {
    cursor: pointer;

    :nth-child(even) {
      background: var(--color-background-default);
    }

    &.MuiTableRow-hover:nth-child(even) {
      background: var(--color-background-default);

      &:hover {
        background: var(--color-neutral-200) !important;
      }
    }

    &.MuiTableRow-hover:hover {
      background: var(--color-neutral-100) !important;
    }
  }

  .MuiTableCell-root {
    border: none;
    align-self: center;
    width: auto !important;

    .MuiCheckbox-indeterminate {
      svg {
        path {
          fill {
            color: green;
          }
        }
      }
    }
  }

  .MuiTableSortLabel-icon {
    margin-right: 0px !important;
  }

  .MuiSelect-select.MuiSelect-select {
    color: var(--color-neutral-500);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-standard);
    border: 1px solid var(--color-secondary-first-dark);
    border-radius: 4px;
    padding-right: 0px;
    padding: 4px 12px 4px 2px;
    margin-right: 3px;
  }

  .MuiTable-root {
    /* Footer */

    .MuiButtonBase-root {
      color: var(--color-primary-first-main);
      font-size: var(--font-size-standard);
    }

    tfoot {
      margin-top: 8px;
      border-top: 1px solid var(--color-neutral-200);

      td {
        float: right;
        overflow-x: auto;
        display: flex;
        align-items: center;

        &::before {
          content: 'Resultados por página';
          font-size: 14px;
          color: var(--color-neutral-500);
        }

        > .MuiTablePagination-toolbar {
          width: auto !important;
          grid-gap: 10px;

          & div:last-child {
            grid-gap: 10px;
          }

          > .MuiTablePagination-selectRoot {
            order: 0 !important;
          }

          & span:nth-child(1) {
            order: 2;
          }

          & span:nth-child(3) {
            order: 2;
            margin-left: 0 !important;
          }

          button {
            border: 1px solid var(--color-secondary-first-dark);
            height: 30px;
            width: 30px;

            span {
              span {
                color: var(--color-primary-first-dark);
                font-size: 20px;
              }
            }

            &:hover {
              border: 1px solid var(--color-primary-first-dark);
              background: var(--color-primary-first-dark);
              color: #fff;

              span {
                span {
                  color: #fff;
                }
              }
            }
          }

          & .MuiIconButton-root.Mui-disabled {
            border: 1px solid var(--color-secondary-first-dark);
            cursor: not-allowed !important;
            opacity: 0.5;
            color: red;

            span {
              color: red;

              span {
                color: red;
              }
            }
          }

          span.MuiTypography-root.MuiTypography-caption {
            font-size: 14px;
            font-weight: 500;
            color: var(--color-neutral-500);
          }
        }
      }
    }
  }
`
