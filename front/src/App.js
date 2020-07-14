import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LoadingOutlined } from '@ant-design/icons'

import getUserRole from './functions/getUserRole'

import 'antd/dist/antd.css'

import { Layout, Menu } from 'antd'
// import Axios from 'axios'
const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

const axios = require('axios').default

const App = () => {
	const handleNavClick = (e) => {
		if (e.key === 'home') console.log('already in home')
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
		if (isAuthenticated) {
			console.log('getting user role')
			getUserRole(email).then((val) => {
				setUserRole(val)
				console.log('user role is' + val)
			})
		}
	}, [isAuthenticated, email])

	const [response, setResponse] = useState('None')
	useEffect(() => {
		const getResponse = async () => {
			if (isAuthenticated) {
				try {
					const accessToken = await getAccessTokenSilently({
						audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
					})
					const config = {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
					axios({
						method: 'get',
						url: 'http://localhost:9000/azin',
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					})
						.then((response) => {
							setResponse(response)
						})
						.catch((error) => {
							console.log(error)
						})
				} catch (e) {
					console.log(e.message)
				}
			}
		}
		getResponse()
	}, [isAuthenticated, getAccessTokenSilently])

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
				<h1>{JSON.stringify(response)}</h1>
				{/*Injaa bayad be tavajjoh be role ye component khaas ro load konim*/}
			</Content>
		</Layout>
	)
}

export default App
