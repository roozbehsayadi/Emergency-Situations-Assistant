import React, { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
} from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'

import sendGetRequestAndSet from './functions/sendGetRequestAndSet'

import ControlCenterAgentForms from './components/ControlCenterAgentForms'
import FieldAgentForms from './components/FieldAgentForms'
import FormToSubmit from './components/FormToSubmit/FormToSubmit'

import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import ControlCenterAgentSubmissionList from "./components/ControlCenterAgentSubmissionList";
const { Header, Content } = Layout
const { SubMenu } = Menu

const App = () => {
	let history = useHistory()

	const handleNavClick = (e) => {
		if (e.key === 'home') history.push('/')
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

	const [nickname, setNickname] = useState(null)
	const [picture, setPicture] = useState(null)
	const [email, setEmail] = useState(null)
	useEffect(() => {
		if (user) {
			setNickname(user.nickname)
			setPicture(user.picture)
			setEmail(user.email)
		}
	}, [user])

	const [userRole, setUserRole] = useState('None')
	const [accessToken, setAccessToken] = useState('None')

	useEffect(() => {
		if (isAuthenticated && accessToken !== 'None')
			sendGetRequestAndSet(`role`, accessToken, setUserRole)
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
				<Router>
					<Switch>
						{isAuthenticated && userRole !== 'None' && (
							<>
								<Route
									exact
									path="/"
									children={<Redirect to="/forms" />}
								/>
								<Route
									path="/forms"
									children={
										userRole === 'field_agent' ? (
											<FieldAgentForms
												token={accessToken}
											/>
										) : (
											<ControlCenterAgentForms
												token={accessToken}
												username={email}
											/>
										)
									}
								/>
								<Route
									path="/submissions/:id"
									children={
										<ControlCenterAgentSubmissionList
											token={accessToken}
											username={email}
										/>
									}
								/>
								<Route
									path="/submit_form/:id"
									children={
										<FormToSubmit
											token={accessToken}
											username={email}
										/>
									}
								/>
							</>
						)}
					</Switch>
				</Router>
			</Content>
		</Layout>
	)
}

export default App
