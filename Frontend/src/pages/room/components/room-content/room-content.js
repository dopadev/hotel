import { useNavigate } from 'react-router-dom'
import './room-content.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId, selectUserRole } from '../../../../selectors'
import { ROLE } from '../../../../constants'
import { deleteRoomAsync } from '../../../../actions'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { fetchAllRooms, fetchRooms, formatDate } from '../../../../utils'

export const RoomContent = ({
	room: { id, number, price, info, images, bookings },
}) => {
	const [showButton, setShowButton] = useState(true)

	const userId = useSelector(selectUserId)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userRole = useSelector(selectUserRole)
	const { startDate, endDate } = useSelector(state => state.dateRange)

	const onDeleteButtonClick = id => {
		dispatch(deleteRoomAsync(id)).then(() => navigate('/'))
	}

	const onBookButtonClick = async () => {
		try {
			await axios.post(`/rooms/${id}/bookings`, {
				checkIn: formatDate(startDate),
				checkOut: formatDate(endDate),
			})
			navigate(`/`)
		} catch (error) {
			console.error('Ошибка при бронировании:', error)
		}
	}

	const onCancelButtonClick = async () => {
		try {
			await axios.delete(`/rooms/${id}/bookings`)
			navigate(`/`)
		} catch (error) {
			console.error('Ошибка отмене бронирования:', error)
		}
	}

	useEffect(() => {
		//request('/rooms').then(({ data }) => setRooms(data))
		fetchRooms(startDate, endDate).then(rooms => {
			const isRoomAvailable = rooms.some(room => room.id === id)
			setShowButton(isRoomAvailable)
		})
	}, [endDate, id, showButton])

	return (
		<div className="room-content">
			<div className="room-content-special room-content-images">
				{images.map((roomImage, index) => (
					<img
						key={index}
						className="room-card-image room-card-block room-content-image"
						src={roomImage}
						alt="Room"
					/>
				))}
			</div>

			<div className="room-content-special">
				<div className="special-panel">
					<div className="room-number">
						<h1>Room {number}</h1>
					</div>
					{userRole === ROLE.ADMIN ? (
						<div className="special-panel-buttons">
							<button
								className="header-link-log-out control-panel-link link special-button edit-button"
								type="button"
								onClick={() => navigate(`/room/${id}/edit`)}
							>
								Edit
							</button>
							<button
								className="header-link-log-out control-panel-link link special-button"
								type="button"
								onClick={() => onDeleteButtonClick(id)}
							>
								Delete
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className="room-text">{info}</div>
				{userRole !== ROLE.GUEST && (
					<div className="jc-end">
						<h1>{price} €</h1>
						{showButton ? (
							<button
								className="header-link-sign-up control-panel-link link book-link book-button"
								type="button"
								onClick={onBookButtonClick}
							>
								Book
							</button>
						) : (
							<button
								className="header-link-sign-up control-panel-link link book-link book-button"
								type="button"
								onClick={onCancelButtonClick}
							>
								Cancel
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
