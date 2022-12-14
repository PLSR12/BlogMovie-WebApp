import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #b5b5b5;
  padding: 20px 60px;
  position: fixed;
  background: #fff;
  top: 0rem;
  left: 0rem;
  z-index: 10;
  width: 100vw;
  box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.37);

  @media only screen and (max-width: 450px) {
    padding: 20px 20px;
  }
`

export const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  h1 {
    font-size: 26px;
    cursor: pointer;
    color: var(--color-primary-first-darker);
  }
`

export const Nav = styled.ul`
  display: flex;
  gap: 20px;
  outline: none;

  @media screen and (max-width: 1180px) {
    display: none;
  }

  a {
    position: relative;
    font-size: 15px;
    color: gray;
    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
    &::after {
      content: '';
      position: absolute;
      top: 25px;
      right: 0;
      height: 2px;
      width: 100%;
      color: var(--color-primary-first-darker);
      background-color: var(--color-primary-first-darker);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.6s;
    }
  }

  nav {
    position: absolute;
    top: 2rem;
    width: 200px;
    height: 10rem;
    background: #fff;
    font-size: 1.2rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }
  }

  .navProductsOff {
    nav {
      background: transparent;
      z-index: -1;

      li {
        display: none;
      }
    }
  }

  .navProducts {
    nav {
      border: 1px solid rgb(0, 0, 0, 0.25);

      a {
        display: flex;
        align-items: center;
        width: 100%;

        svg {
          margin-left: auto;
        }
      }
    }
  }
`

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  > svg {
    font-size: 20px;
    cursor: pointer;
  }
  p {
    font-size: 16px;
    cursor: pointer;
  }
`

export const MenuHamburguer = styled.div`
  display: none;
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;

  @media screen and (max-width: 1180px) {
    display: flex;
  }

  .navHamburguer {
    opacity: 0;
    margin-left: 1000px;
    transition: 1s;
  }

  .navTrue {
    transition: 1s;
    margin-left: 0px;
    opacity: 1;
  }

  nav {
    position: absolute;
    left: 0rem;
    top: 72px;
    width: 100vw;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    list-style: none;

    li {
      padding: 0 10px;
      font-size: 1.3rem;
      color: #000;
      height: 50px;
      display: flex;
      align-items: center;
      border-top: 1px solid rgb(0, 0, 0, 0.15);

      &:hover {
        background: rgb(0, 0, 0, 0.05);
      }

      a {
        color: #000;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
    }

    .inputEmailFooter {
      width: 220px;
      height: 30px;
      display: flex;
      margin: 1rem auto 1rem auto;

      input {
        width: 190px;
        height: 100%;
        border: 1px solid #000;
        border-right: 0;
        padding-left: 10px;
        font-size: 0.8rem;
      }

      .iconInputEmailFooter {
        background: #ff7d1b;
        border: 1px solid #000;
        color: #fff;
        width: 30px;
        height: 100%;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          font-size: 1rem;
        }
      }
    }

    p {
      margin: 0 auto;
      font-size: 1rem;
      font-weight: 700;
      display: flex;
      align-items: center;

      svg {
        margin-left: 30px;
        transition: 0.5s;
        font-size: 1.5rem;

        &:hover {
          color: #ff7d1b;
        }
      }
    }

    .loginAndRegister {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      border-top: 1px solid rgb(0, 0, 0, 0.15);
    }
  }
`
