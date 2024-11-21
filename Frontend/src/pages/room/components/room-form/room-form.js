import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACTION_TYPE, saveRoomAsync } from '../../../../actions'
import '../../../register/register.css'

export const RoomForm = ({ room: { id, number, price, info, images } }) => {
	const [numberValue, setNumberValue] = useState(number)
	const [priceValue, setPriceValue] = useState(price)
	const [infoValue, setInfoValue] = useState(info)
	const [imagesValue, setImagesValue] = useState(images)

	const [imageUrl, setImageUrl] = useState('imageUrl')
	const [title, setTitle] = useState('title')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSave = () => {
		let imagesLinksArray = ''
		let imagesArray = ''
		let imagesString = ''

		if (Array.isArray(imagesValue)) {
			imagesString = imagesValue.join(', ')
		}

		if (typeof imagesValue === 'string') {
			imagesLinksArray = imagesValue.split(',').map(imageLink => imageLink.trim())
		} else {
			imagesLinksArray = imagesString.split(',').map(imageLink => imageLink.trim())
		}

		dispatch(
			saveRoomAsync(id, {
				number: numberValue,
				price: priceValue,
				info: infoValue,
				images: imagesLinksArray,
			}),
		).then(({ id }) => navigate(`/room/${id}`))
	}

	const onNumberChange = ({ target }) => setNumberValue(target.value)
	const onPriceChange = ({ target }) => setPriceValue(target.value)
	const onInfoChange = ({ target }) => setInfoValue(target.value)
	const onImagesChange = ({ target }) => setImagesValue(target.value)

	return (
		<div className="register">
			<div className="register-card add-room-card">
				<h2 className="register-card-title">Set room</h2>
				<div className="register-card-form">
					<input
						type="text"
						placeholder="Number"
						value={numberValue}
						onChange={onNumberChange}
					/>
					<input
						type="text"
						placeholder="Price"
						value={priceValue}
						onChange={onPriceChange}
					/>
					<input
						type="text"
						placeholder="Info"
						value={infoValue}
						onChange={onInfoChange}
					/>
					<input
						type="text"
						placeholder="Images"
						value={imagesValue}
						onChange={onImagesChange}
					/>
					<button
						className="header-link-sign-up control-panel-link link register-button"
						type="submit"
						onClick={onSave}
					>
						Save
					</button>
				</div>
			</div>

			{/*{errorMessage && <h3 className="error-message">{errorMessage}</h3>}*/}
		</div>
	)
}
