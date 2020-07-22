const axios = require('axios').default

const sendPostRequest = (api, accessToken, data) => {
	axios({
		method: 'post',
		url: `http://localhost:9000/${api}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		data: data,
	})
		.then((response) => {
			console.log(response)
		})
		.catch((error) => {
			console.log(
				'error in adding form submission with error code' + error
			)
		})
}

export default sendPostRequest
