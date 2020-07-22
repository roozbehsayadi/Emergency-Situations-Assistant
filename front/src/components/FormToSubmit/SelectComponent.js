import React from 'react'
import { Select } from 'antd'

const SelectComponent = (description) => {
	const { Option } = Select
	return (
		<Select allowClear>
			{description.options.map((option, optionIndex) => {
				return (
					<Option
						value={JSON.stringify(option.value)}
						key={optionIndex}
					>
						{JSON.stringify(option.label)}
					</Option>
				)
			})}
		</Select>
	)
}

export default SelectComponent
