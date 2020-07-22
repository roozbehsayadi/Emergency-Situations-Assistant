const axios = require('axios').default

const sendPostRequest = (api, accessToken) => {
	axios({
		method: 'post',
		url: `http://localhost:9000/${api}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then((response) => {
			console.log('added form submission.')
		})
		.error((error) => {
			console.log(
				'error in adding form submission with error code' + error
			)
		})
}

export default sendPostRequest
