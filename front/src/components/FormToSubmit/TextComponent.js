import React from 'react'
import { Form, Input } from 'antd'

import SelectComponent from './SelectComponent'

const TextComponent = ({ description, index }) => {
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
					<Input />
				)}
				<br />
			</Form.Item>
		</>
	)
}

export default TextComponent
