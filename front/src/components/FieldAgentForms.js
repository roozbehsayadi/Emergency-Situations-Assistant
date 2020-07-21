import React, { useState, useEffect } from 'react'

import sendGetRequestAndSet from '../functions/sendGetRequestAndSet'

const FieldAgentForms = ({ token, username }) => {
	const [forms, setForms] = useState(null)
	useEffect(() => {
		sendGetRequestAndSet('forms/', token, setForms)
		console.log(forms)
	}, [])

	return <h1>Field agent!</h1>
}

export default FieldAgentForms
