import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`

export const CategoriesMenu = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5vw;
  margin-top: 11vh;
  padding-top: 25px;
`

export const CategoryButton = styled.button<{ isActiveBrand: boolean }>`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.isActiveBrand && '2px solid var(--color-primary-first-darker)'};
  color: ${(props) =>
    props.isActiveBrand ? 'var(--color-primary-first-darker)' : '#000'};
  font-size: 1.2rem;
`

export const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  padding: 3vw;

  .nothing-notice {
    font-size: 22px;
    font-weight: bold;
  }
`
