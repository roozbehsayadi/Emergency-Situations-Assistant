import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Typography, Form, Space, Button, Divider } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import sendGetRequestAndSet from '../../functions/sendGetRequestAndSet'
import sendPostRequest from '../../functions/sendPostRequest'

import TextComponent from './TextComponent'
import NumberComponent from './NumberComponent'
import DateComponent from './DateComponent'
import MapComponent from './MapComponent'

const { Title } = Typography

var isJson = require('is-valid-json')

const canParse = (s) => {
	try {
		JSON.parse(s)
	} catch (e) {
		return false
	}
	return true
}

const FormToSubmit = ({ token, username }) => {
	const { id } = useParams()
	let history = useHistory()

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

	const [markers, setMarkers] = useState({})

	const [formComponents, setFormComponents] = useState([])
	useEffect(() => {
		setFormComponents(
			formFields.map((field, index) => {
				return getRespectiveComponent(
					id,
					field,
					index,
					markers,
					setMarkers
				)
			})
		)
	}, [formFields])

	const redirectToForms = () => {
		history.push('/forms')
	}

	const turnSubmissionIntoArray = (values) => {
		let returnValue = []
		Object.keys(values).forEach((key, index) => {
			let temp = {}
			temp.name = key
			for (let i = 0; i < formFields.length; i++) {
				if (formFields[i].name === key) {
					temp.title = formFields[i].title
					temp.type = formFields[i].type
				}
			}
			if (values[key]._isAMomentObject === true)
				temp.answer = values[key]._d
			else if (values[key].hasOwnProperty('lat'))
				temp.answer = [values[key].lat, values[key].lng]
			else if (canParse(values[key])) {
				const answerTemp = JSON.parse(values[key])
				if (answerTemp.lat) {
					if (
						typeof answerTemp.lat === 'string' ||
						answerTemp instanceof String
					)
						temp.answer = [
							parseFloat(answerTemp.lat),
							parseFloat(answerTemp.long),
						]
					else temp.answer = [answerTemp.lat, answerTemp.long]
				} else temp.answer = answerTemp
			} else temp.answer = values[key]
			returnValue.push(temp)
		})
		return returnValue
	}

	const handleSubmit = (values) => {
		for (let key in markers) {
			const fieldName = key.replace(`form_${id}_`, '')
			values[fieldName] = markers[key].position
		}
		console.log(values)
		values = turnSubmissionIntoArray(values)
		sendPostRequest(`user/${username}/forms/${id}/post_form`, token, values)
		history.push('/forms')
	}

	return (
		<div>
			<Title>{formTitle}</Title>
			<Form name={`form_${id}`} onFinish={handleSubmit}>
				<Space direction="vertical" style={{ marginTop: '2%' }}>
					<Button
						type="default"
						onClick={redirectToForms}
						icon={<HomeOutlined />}
					>
						Go Back to Forms
					</Button>
					<Divider />
					<div style={{ marginTop: '2%' }}>{formComponents} </div>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Space>
			</Form>
		</div>
	)
}

const getRespectiveComponent = (formId, field, index, markers, setMarkers) => {
	if (field.type === 'Text')
		return <TextComponent description={field} index={index} />
	if (field.type === 'Number')
		return <NumberComponent description={field} index={index} />
	if (field.type === 'Date')
		return <DateComponent description={field} index={index} />
	if (field.type === 'Location')
		return (
			<MapComponent
				description={field}
				index={index}
				markers={markers}
				setMarkers={setMarkers}
				formId={formId}
			/>
		)
	return <h1>Unknown component!</h1>
}

export default FormToSubmit
