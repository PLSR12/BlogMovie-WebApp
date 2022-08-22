import React, { useEffect, useState } from 'react'

import { Container, Label, Error } from './styles'

interface SelectComponentProps {
  id: string
  label: string
}

type DataProps = {
  info: Array<SelectComponentProps>
  defaultValue?: string
  onChange: (e: any) => void
  text: string
  error?: any
  id?: number
}

export function Select({
  info,
  defaultValue,
  onChange,
  text,
  error,
  id,
}: DataProps) {
  const [people, setPeople] = useState<any>()

  useEffect(() => {
    setPeople(defaultValue)

    if (defaultValue !== '') {
      onChange({ target: { value: defaultValue } })
    }
  }, [])

  return (
    <Container>
      <Label>{text}</Label>

      <select
        name="people"
        value={people}
        onChange={(e) => setPeople(onChange(e))}
        defaultValue={defaultValue}
      >
        <option value={id}> Selecione:</option>
        {info.map((rows, index) => (
          <option value={rows.id} key={index}>
            {rows.label}
          </option>
        ))}
      </select>
      {!!error && <Error>{error.message}</Error>}
    </Container>
  )
}
