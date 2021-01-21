import React, {useContext, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useHttp} from '../hooks/http'
import {useMessage} from '../hooks/message'
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const LoginPage = () => {
	const auth = useContext(AuthContext)

	const {register, errors, handleSubmit} = useForm()
	const {loading, error, request, clearError} = useHttp()
	const message = useMessage()

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	const onSubmit = async (data) => {
		try {
			const response = await request('/api/auth/login', 'POST', {...data})
			auth.login(response.token, response.userId)
		} catch (e) {}
	}

	return (
		<div className="auth-wrapper">
			<div className="card">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="card-content">
						<div className="auth-card-title">
							<div className="icon-wrapper pink white-text"><span className="material-icons">lock</span></div>
							<span className="card-title">Вхід</span>
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
					</div>
					<div className="card-action">
						<button
							className="btn blue"
							type="submit"
							disabled={loading}
						>Увійти</button>
						<p>Ще не маєте облікового запису? <Link to="/register">Зареєструватися</Link></p>
					</div>
				</form>
			</div>
		</div>
	)
}
