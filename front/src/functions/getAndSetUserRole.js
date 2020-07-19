const axios = require('axios').default

const getAndSetUserRole = async (
	username,
	getAccessTokenSilently,
	setUserRole
) => {
	const accessToken = await getAccessTokenSilently({
		audience: process.env.REACT_APP_AUTH0_API_IDENTIFIER,
	})
	axios({
		method: 'get',
		url: `http://localhost:9000/user/${username}/role`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then((response) => {
			setUserRole(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
}

export default getAndSetUserRole
