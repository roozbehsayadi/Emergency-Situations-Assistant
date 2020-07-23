const axios = require('axios').default

const sendGetRequestAndSet = async (api, accessToken, setterFunction) => {
	axios({
		method: 'get',
		url: `/${api}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then((response) => {
			setterFunction(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
}

export default sendGetRequestAndSet
