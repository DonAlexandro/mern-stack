import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage';
import {CreatePage} from './pages/CreatePage';
import {DetailPage} from './pages/DetailPage';
import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/links" exact>
					<LinksPage />
				</Route>
				<Route path="/create" exact>
					<CreatePage />
				</Route>
				<Route path="/detail/:id">
					<DetailPage />
				</Route>
				<Redirect to="/create"/>
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/login" exact>
				<LoginPage />
			</Route>
			<Route path="/register" exact>
				<RegisterPage />
			</Route>
			<Redirect to="/login"/>
		</Switch>
	)
}
