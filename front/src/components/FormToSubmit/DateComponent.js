import React from 'react'
import { Form, DatePicker } from 'antd'

import SelectComponent from './SelectComponent'

const DateComponent = ({ description, index }) => {
	return (
		<>
			<Form.Item
				name={description.name}
				label={description.title}
				key={index}
				rules={[
					{
						required: description.hasOwnProperty('required')
							? description.required
							: false,
					},
				]}
				style={{ display: 'inline-block' }}
			>
				{description.hasOwnProperty('options') ? (
					SelectComponent(description)
				) : (
					<DatePicker />
				)}
			</Form.Item>
			<br />
		</>
	)
}

export default DateComponent
