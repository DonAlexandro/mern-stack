import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
	const auth = useContext(AuthContext)
	const history = useHistory()

	const logoutHandler = event => {
		event.preventDefault()

		auth.logout()
		history.push('/login')
	}

	return (
		<nav className="blue">
			<div className="nav-wrapper container">
				<span className="brand-logo">Link shorter</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink to="/create">Створити</NavLink></li>
					<li><NavLink to="/links">Посилання</NavLink></li>
					<li><a href="/" onClick={logoutHandler}>Вийти</a></li>
				</ul>
			</div>
		</nav>
	)
}
