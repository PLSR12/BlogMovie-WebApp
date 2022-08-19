import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { useHistory } from 'react-router-dom'

import { LogInSchema } from './validations'

import AuthService from 'services/Auth.service'
import { ToastService } from 'services/toast.service'
import * as S from './styles'

interface UserDataInput {
  email: string
  password: string
}

export function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataInput>({
    resolver: yupResolver(LogInSchema),
  })

  const onSubmit = async (data: UserDataInput) => {
    try {
      await AuthService.signIn({
        email: data.email,
        password: data.password,
      })

      ToastService.success('Login realizado com sucesso')
      setTimeout(() => {
        history.push('/admin-articles')
      }, 3000)
    } catch (err) {
      ToastService.error('Erro ao realizar Login,tente novamente mais tarde')
    }
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
