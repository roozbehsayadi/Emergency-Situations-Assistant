import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Typography, Form, Space, Button, Divider } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import sendGetRequestAndSet from '../../functions/sendGetRequestAndSet'

import TextComponent from './TextComponent'
import NumberComponent from './NumberComponent'
import DateComponent from './DateComponent'
import MapComponent from './MapComponent'

const { Title } = Typography

const handleSubmit = (values) => {
	console.log(values)
}

const FormToSubmit = ({ token }) => {
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

	const [markers, setMarkers] = useState([])
	useEffect(() => {
		setMarkers(
			formFields
				.filter((field) => field.type === 'Location')
				.map((field) => {
					return { lat: 35.802062, long: 51.393561 }
				})
		)
	}, [formFields])

	const [formComponents, setFormComponents] = useState([])
	useEffect(() => {
		setFormComponents(
			formFields.map((field, index) => {
				return getRespectiveComponent(field, index)
			})
		)
	}, [formFields])

	const redirectToForms = () => {
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

const getRespectiveComponent = (field, index) => {
	if (field.type === 'Text')
		return <TextComponent description={field} index={index} />
	if (field.type === 'Number')
		return <NumberComponent description={field} index={index} />
	if (field.type === 'Date')
		return <DateComponent description={field} index={index} />
	if (field.type === 'Location')
		return <MapComponent description={field} index={index} />
	return <h1>COMPONENTTTT!</h1>
}

export default FormToSubmit
