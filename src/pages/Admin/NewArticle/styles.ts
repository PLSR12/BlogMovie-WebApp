import { Button } from 'components/Atoms/Button'
import styled from 'styled-components'

export const Container = styled.div`
  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    margin-top: 25px;
    border-width: 2px;
    border-radius: 2px;
    border: 2px #8f8f8f dashed;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    margin-bottom: 25px;

    p {
      font-size: 15px;
      color: #000000;
    }
  }
`
export const Label = styled.p`
  font-size: 15px;
  color: #fff;
  margin-bottom: 5px;
`

export const ButtonStyle = styled(Button)`
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 25px;
  background: var(--color-primary-first-darker);
`
export const LabelUpload = styled.label`
  margin-top: 35px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  border: 1px #000 dashed;
  border-radius: 5px;
  padding: 35px;
  gap: 5px;
  align-items: center;
  color: #000;

  input {
    width: 1px;
    opacity: 0;
  }
`
