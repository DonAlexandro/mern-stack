import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useHttp} from '../hooks/http'
import {useMessage} from '../hooks/message'
import {Link, useHistory} from 'react-router-dom';

export const RegisterPage = () => {
	const {register, errors, handleSubmit} = useForm()
	const {loading, error, request, clearError} = useHttp()
	const message = useMessage()
	const history = useHistory()

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	const onSubmit = async (data) => {
		try {
			const response = await request('/api/auth/register', 'POST', {...data})
			history.push('/login')
			message(response.message)
		} catch (e) {}
	}

	return (
		<div className="auth-wrapper">
			<div className="card">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="card-content">
						<div className="auth-card-title">
							<div className="icon-wrapper pink white-text"><span className="material-icons">lock</span></div>
							<span className="card-title">Реєстрація</span>
						</div>
						<div className="input-field">
							<label htmlFor="name">Ім'я</label>
							<input
								id="name"
								type="text"
								name="name"
								ref={register({
									required: `Введіть своє ім'я`,
									minLength: {
										value: 2,
										message: `Мінімальна довжина імені - 2 символа`
									}
								})}
							/>
							<span className="helper-text red-text">{errors.name?.message}</span>
						</div>
						<div className="input-field">
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								name="email"
								ref={register({
									required: 'Введіть свій Email',
									pattern: {
										value: /.+@.+\..+/,
										message: 'Введіть коректний Email'
									}
								})}
							/>
							<span className="helper-text red-text">{errors.email?.message}</span>
						</div>
						<div className="input-field">
							<label htmlFor="password">Пароль</label>
							<input
								id="password"
								type="password"
								name="password"
								ref={register({
									required: 'Введіть пароль',
									minLength: {
										value: 8,
										message: 'Мінімальна довжина паролю - 8 символів'
									}
								})}
							/>
							<span className="helper-text red-text">{errors.password?.message}</span>
						</div>
						<div className="input-field">
							<label htmlFor="confirm">Повторіть пароль</label>
							<input
								id="confirm"
								type="password"
								name="confirm"
								ref={register({
									required: 'Введіть пароль ще раз'
								})}
							/>
							<span className="helper-text red-text">{errors.confirm?.message}</span>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn blue"
							type="submit"
							disabled={loading}
						>Зареєструватися</button>
						<p>Вже зареєстровані? <Link to="/login">Увійти</Link></p>
					</div>
				</form>
			</div>
		</div>
	)
}