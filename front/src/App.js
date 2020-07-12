import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { LoadingOutlined } from '@ant-design/icons'

import getUserRole from './functions/getUserRole'

import 'antd/dist/antd.css'

import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

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
	} = useAuth0()

	if (isLoading)
		return (
			<div className="loadingCenterContainer">
				<LoadingOutlined />
			</div>
		)

	const { name, picture, email } = user

	return (
		<Layout className="layout">
			<Header>
				{isAuthenticated && (
					<img src={picture} alt="avatar" className="navbar-avatar" />
				)}
				<Menu onClick={handleNavClick} theme="dark" mode="horizontal">
					{isAuthenticated && (
						<SubMenu title={name}>
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
				<h1>{getUserRole(name)}</h1>
			</Content>
		</Layout>
	)
}

export default App
