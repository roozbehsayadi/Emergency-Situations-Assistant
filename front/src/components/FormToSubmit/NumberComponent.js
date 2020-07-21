import React from 'react'
import { Form, InputNumber } from 'antd'

import SelectComponent from './SelectComponent'

const NumberComponent = ({ description, index }) => {
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
						type: 'number',
						message: 'This should be a number',
					},
				]}
				style={{ display: 'inline-block' }}
			>
				{description.hasOwnProperty('options') ? (
					SelectComponent(description)
				) : (
					<InputNumber />
				)}
			</Form.Item>
			<br />
		</>
	)
}

export default NumberComponent
