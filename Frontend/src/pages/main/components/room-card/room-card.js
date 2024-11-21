import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Carousel } from './components'
import './room-card.css'

export const RoomCard = ({ id, number, info, price, images, status, bookings }) => {
	const navigate = useNavigate()

	const onSelectButtonClick = () => {
		navigate(`/room/${id}`)
	}

	return (
		<>
			{/*{!bookings.length ? (*/}
			{true ? (
				<li className="room-card" key={id}>
					<div className="room-card-slider room-card-block">
						<Carousel images={images} />
					</div>
					<Link to={`/room/${id}`} className="fd-row">
						<div className="room-card-info room-card-block">
							<div className="info-title">
								<span>Room {number}</span>
							</div>
							<div className="info-description">
								<span>{info}</span>
							</div>
						</div>
					</Link>
					<div className="room-card-price room-card-block">
						<span className="price">{price} €</span>
						<button
							className="header-link-sign-up control-panel-link link book-link"
							type="button"
							onClick={onSelectButtonClick}
						>
							Select
						</button>
					</div>
				</li>
			) : (
				<></>
			)}
		</>
	)
}
