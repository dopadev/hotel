import { Link } from 'react-router-dom'
import './room-item.css'

export const RoomItem = ({ id, number, bookings, startDate, endDate }) => {
	const bookedRoom = bookings.some(
		booking =>
			new Date(startDate) < new Date(booking.checkOut) &&
			new Date(endDate) > new Date(booking.checkIn),
	)
	return (
		<>
			{bookedRoom ? (
				<Link to={`/room/${id}`}>
					<li className="room-item status-booked" key={id}>
						<h2>{number}</h2>
					</li>
				</Link>
			) : (
				<Link to={`/room/${id}`}>
					<li className="room-item" key={id}>
						<h2>{number}</h2>
					</li>
				</Link>
			)}
		</>
	)
}
