import React, {useContext} from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {Navbar} from '../components/Navbar'
import {useHttp} from '../hooks/http'
import {AuthContext} from '../context/AuthContext';

export const CreatePage = () => {
	const auth = useContext(AuthContext)
	const {register, errors, handleSubmit} = useForm()
	const {request} = useHttp()
	const history = useHistory()

	const onSubmit = async ({link}) => {
		try {
			const data = await request('/api/link/generate', 'POST', {from: link}, {
				Authorization: `Bearer ${auth.token}`
			})

			history.push(`/detail/${data.link._id}`)
		} catch (e) {}
	}

	return (
		<>
			<Navbar />
			<div className="container">
				<div className="row">
					<form className="col s8 offset-s2" onSubmit={handleSubmit(onSubmit)}>
						<div className="input-field">
							<label htmlFor="link">Помістіть посилання</label>
							<input
								id="link"
								type="url"
								name="link"
								ref={register({
									required: 'Введіть URL-адрес',
									pattern: {
										// eslint-disable-next-line
										value: /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
										message: 'Введіть коректний URL-адрес'
									}
								})}
							/>
							<span className="helper-text red-text">{errors.link?.message}</span>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
