import React, { useState, useEffect } from 'react'

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { HomeOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import sendGetRequestAndSet from '../functions/sendGetRequestAndSet'

const FormToSubmit = ({ token }) => {
	const { id } = useParams()

	const [formInfo, setFormInfo] = useState(null)
	useEffect(() => {
		sendGetRequestAndSet(`forms/${id}`, token, setFormInfo)
	}, [])

	const [formFields, setFormFields] = useState([])
	const [formTitle, setFormTitle] = useState(null)
	useEffect(() => {
		if (formInfo) {
			setFormFields(formInfo.fields)
			setFormTitle(formInfo.title)
		}
	}, [formInfo])

	return (
		<>
			<p>{JSON.stringify(formInfo)}</p>
			<p>{JSON.stringify(formFields)}</p>
			<p>{JSON.stringify(formTitle)}</p>
		</>
	)
}

export default FormToSubmit
