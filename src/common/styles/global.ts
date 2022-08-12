import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

import './_root.css'

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

*:focus {
  outline: 0;
}

html, body, #root {
  height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  background: var(--color-background-default);

  position: relative;
  min-height: 100%;
  font-feature-settings: 'kern';
}

body, input, button{
  font: 14px 'Roboto', sans-serif;
}

body, input, textarea, button, ul, li, a, b, p, span {
  font-family: 'Roboto', sans-serif;
}


a {
  text-decoration: none;
}

ul {
  list-style: none;
}

li {
  cursor: pointer;
}

button {
  cursor: pointer;
}

/** Used to define container behavior: width, position: fixed etc... **/
.Toastify__toast-container {
  width: 461px;
  height: 64px;
  border-radius: 8px;
}

/* Toast type info */
.Toastify__toast-theme--colored.Toastify__toast--info {
  background-color: var(--color-info-main);
  /* box-shadow: 0px 16px 13px -10px rgba(24, 144, 255, 0.36); */

  & .Toastify__toast-icon {
    color: var(--color-info-dark);
  }
}

/* Toast type sucess */
.Toastify__toast-theme--colored.Toastify__toast--success {
  background-color: var(--color-success-main);
  box-shadow: 0px 16px 13px -10px rgba(84, 214, 44, 0.36);

  & .Toastify__toast-icon {
    color: var(--color-success-dark);
  }
}

/* Toast type warning */
.Toastify__toast-theme--colored.Toastify__toast--warning {
  background-color: var(--color-warning-main);

  & .Toastify__toast-icon {
    color: var(--color-warning-darker);
  }

}

/* Toast type error */
.Toastify__toast-theme--colored.Toastify__toast--error {
  background-color: var(--color-danger-dark);

  & .Toastify__toast-icon {
    color: var(--color-danger-darker);
  }
}

.ReactModalPortal {
  .ReactModal__Overlay {
    z-index: 10010;
    background-color: rgba(0, 0, 0, 0.6) !important;

    .ReactModal__Content {
      top: calc(50% - 136px) !important;
      left: calc(50% - 200px) !important;
      inset: 0;
      width: 400px;
      height: fit-content;

      background: var(--color-background-paper) !important;
      border: 1px solid var(--color-neutral-200) !important;
      box-shadow: var(--shadow-level-2) !important;
      border-radius: var(--border-radius-medium) !important;
    }
  }
}

`
