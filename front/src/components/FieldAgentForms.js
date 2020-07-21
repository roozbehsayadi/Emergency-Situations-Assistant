import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Table } from 'antd'

import sendGetRequestAndSet from '../functions/sendGetRequestAndSet'

const FieldAgentForms = ({ token, username }) => {
	let history = useHistory()

	const [forms, setForms] = useState(null)
	useEffect(() => {
		sendGetRequestAndSet('forms', token, setForms)
	}, [])

	const [tableForms, setTableForms] = useState(null)
	useEffect(() => {
		if (forms !== null)
			setTableForms(
				forms.map((form, index) => {
					return {
						key: index + 1,
						id: form['id'],
						title: form.title,
					}
				})
			)
	}, [forms])

	const columns = [
		{ title: '#', dataIndex: 'key', key: 'key', width: '1%' },
		{ title: 'ID', dataIndex: 'id', key: 'id', width: '4%' },
		{ title: 'Title', dataIndex: 'title', key: 'title' },
	]

	return (
		<Table
			dataSource={tableForms}
			columns={columns}
			loading={forms === null}
			onRow={(record, index) => ({
				onClick: () => {
					history.push(`/submit_form/${record.id}/`)
				},
			})}
		/>
	)
}

export default FieldAgentForms
