import React, { useState, useEffect } from 'react'
import { Form } from 'antd'

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

import SelectComponent from './SelectComponent'

const MapComponent = ({
	formId,
	description,
	index,
	markers,
	setMarkers,
	google,
}) => {
	const [markerPos, setMarkerPos] = useState([])

	const mapOnClick = (t, map, coord) => {
		const { latLng } = coord
		const lat = latLng.lat()
		const lng = latLng.lng()
		let markersTemp = markers
		const markerIndex = `form_${formId}_${description.name}`
		markersTemp[markerIndex] = {
			position: { lat, lng },
		}
		console.log(markersTemp)
		setMarkers({ ...markersTemp })
		setMarkerPos(markersTemp[markerIndex])
	}

	return (
		<>
			<Form.Item
				name={description.name}
				label={description.title}
				key={index}
				style={{
					display: 'inline-block',
					width: description.hasOwnProperty('options')
						? '100px'
						: '300px',
					height: description.hasOwnProperty('options')
						? '100px'
						: '400px',
					marginBottom: description.hasOwnProperty('options')
						? '0%'
						: '65px',
				}}
			>
				{description.hasOwnProperty('options') ? (
					SelectComponent(description)
				) : (
					<Map
						google={google}
						zoom={14}
						containerStyle={{ width: '300px', height: '400px' }}
						initialCenter={{
							lat: 35.802062,
							lng: 51.393561,
						}}
						key={index}
						onClick={mapOnClick}
					>
						<Marker key={index} position={markerPos.position} />
					</Map>
				)}
			</Form.Item>
			<br />
		</>
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapComponent)
