import React, { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'

import sendGetRequestAndSet from './functions/sendGetRequestAndSet'

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
	const [accessToken, setAccessToken] = useState('None')

	useEffect(() => {
		if (isAuthenticated && accessToken !== 'None')
			sendGetRequestAndSet(`user/${email}/role`, accessToken, setUserRole)
		// getAndSetUserRole(email, accessToken, setUserRole)
	}, [isAuthenticated, email, accessToken])

	useEffect(() => {
		const temp = async () => {
			setAccessToken(
				await getAccessTokenSilently({
					audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
				})
			)
		}
		temp()
	}, [getAccessTokenSilently, accessToken])

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
				<Menu
					onClick={handleNavClick}
					selectedKeys={['home']}
					theme="dark"
					mode="horizontal"
				>
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
										<FieldAgentForms token={accessToken} />
									) : (
										<ControlCenterAgentForms
											token={accessToken}
										/>
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
