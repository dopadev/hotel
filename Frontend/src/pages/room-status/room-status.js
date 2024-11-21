import { useEffect, useState } from 'react'
import { request } from '../../utils/request'
import { ROLE } from '../../constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { checkAccess, fetchAllRooms, fetchRooms, formatDate } from '../../utils'
import { RoomItem } from './components'
import axios from 'axios'
import './room-status.css'
import { Calendar } from '../main/components'

export const RoomStatus = () => {
	const userRole = useSelector(selectUserRole) // роль пользователя

	const [rooms, setRooms] = useState([])

	const { startDate, endDate } = useSelector(state => state.dateRange)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return

		fetchAllRooms().then(data => setRooms(data))

		if (formatDate(endDate) !== formatDate(startDate)) {
			//setIsDateDisplayVisible(false)
		}
	}, [userRole, endDate]) // проверяем роль пользователя. Если она изменится, доступ закроется

	const [isDateDisplayVisible, setIsDateDisplayVisible] = useState(true)

	const dateDisplay = document.querySelector('.rdrDateDisplayWrapper')

	if (isDateDisplayVisible && dateDisplay) {
		// Изначально скрываем блоки
		dateDisplay.style.display = 'none'
	}

	return (
		<div className="room-status users">
			{/*<h1>Room status</h1>*/}
			<Calendar />
			{rooms.length ? (
				<>
					<ul className="room-status-list users-list">
						{rooms
							.sort((a, b) => a.number - b.number)
							.map(({ id, number, status, bookings }) => (
								<RoomItem
									key={id}
									id={id}
									number={number}
									status={status}
									bookings={bookings}
									startDate={startDate}
									endDate={endDate}
								/>
							))}
					</ul>
				</>
			) : (
				<div>
					<h1>Rooms not found</h1>
				</div>
			)}
		</div>
	)
}
