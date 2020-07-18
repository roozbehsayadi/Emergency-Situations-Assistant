import React, { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'

import getAndSetUserRole from './functions/getAndSetUserRole'

import ControlCenterAgentForms from './components/ControlCenterAgentForms'
import FieldAgentForms from './components/FieldAgentForms'

import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
const { Header, Content } = Layout
const { SubMenu } = Menu

const App = () => {
	const handleNavClick = (e) => {
		if (e.key === 'home') console.log('Redirect to home')
		else if (e.key === 'login') loginWithRedirect()
		else if (e.key === 'logout')
			logout({ returnTo: window.location.origin })
	}

	const {
		isLoading,
		user,
		loginWithRedirect,
		logout,
		isAuthenticated,
		getAccessTokenSilently,
	} = useAuth0()

	var email = 'None'
	const [userRole, setUserRole] = useState('None')
	useEffect(() => {
		if (isAuthenticated)
			getAndSetUserRole(email, getAccessTokenSilently, setUserRole)
	}, [isAuthenticated, email, getAccessTokenSilently])

	if (isLoading)
		return (
			<div className="loadingCenterContainer">
				<LoadingOutlined />
			</div>
		)

	const { nickname, picture } = user
	email = user.email

	return (
		<Layout className="layout">
			<Header>
				{isAuthenticated && (
					<img src={picture} alt="avatar" className="navbar-avatar" />
				)}
				<Menu onClick={handleNavClick} theme="dark" mode="horizontal">
					{isAuthenticated && (
						<SubMenu title={nickname}>
							<Menu.Item key="logout">Log out</Menu.Item>
						</SubMenu>
					)}
					{!isAuthenticated && (
						<Menu.Item key="login">Log in</Menu.Item>
					)}
					<Menu.Item key="home">Home</Menu.Item>
				</Menu>
			</Header>
			<Content>
				{isAuthenticated && userRole === 'None' && (
					<div className="loadingCenterContainer">
						<LoadingOutlined />
					</div>
				)}
				{isAuthenticated && userRole !== 'None' && (
					<Router>
						<Switch>
							<Route
								exact
								path="/"
								children={<Redirect to="/forms" />}
							/>
							<Route
								path="/forms"
								children={
									userRole === 'field_agent' ? (
										<FieldAgentForms />
									) : (
										<ControlCenterAgentForms />
									)
								}
							/>
						</Switch>
					</Router>
				)}
			</Content>
		</Layout>
	)
}

export default App
