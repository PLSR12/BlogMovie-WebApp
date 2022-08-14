import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'

import { LogInSchema } from './validations'

import * as S from './styles'
import AuthService from 'services/Auth.service'

interface UserDataInput {
  email: string
  password: string
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataInput>({
    resolver: yupResolver(LogInSchema),
  })

  const onSubmit = async (data: UserDataInput) => {
    await AuthService.signIn({
      email: data.email,
      password: data.password,
    })

    setTimeout(() => {
      history.push('/admin-articles')
    }, 3000)
  }

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  return (
    <S.Container>
      <S.ContainerForm>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerHeaderForm>
            <p>Bem-vindo Admin!</p>
          </S.ContainerHeaderForm>

          <label htmlFor="email">Email</label>
          <div>
            <MdEmail color="#c4cdd5" size={22} className="iconMail" />
            <input
              type="email"
              autoFocus
              placeholder="Digite seu email"
              {...register('email')}
              className={errors.email && 'inputError'}
            />
          </div>
          {errors.email && <p>{errors.email.message}</p>}

          <label htmlFor="password">Senha</label>
          <div>
            <MdLock color="#c4cdd5" size={22} />
            <input
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={errors.password && 'inputError'}
            />
            <span>
              {showPassword ? (
                <MdVisibility
                  color="#c4cdd5"
                  size={22}
                  onClick={handleShowPassword}
                  className="iconVisiblity"
                />
              ) : (
                <MdVisibilityOff
                  color="#c4cdd5"
                  size={22}
                  onClick={handleShowPassword}
                  className="iconVisiblity"
                />
              )}
            </span>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
          {isLoading ? (
            <button type="submit" disabled>
              Carregando...
            </button>
          ) : (
            <button type="submit">Entrar</button>
          )}
        </S.Form>
        <small>© 2022 - PAM TECH</small>
      </S.ContainerForm>
    </S.Container>
  )
}
