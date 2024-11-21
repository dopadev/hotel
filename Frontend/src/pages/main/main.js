import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, RoomCard } from './components'
import { request } from '../../utils/request'
import axios from 'axios'
import { DateRange } from 'react-date-range'
import { setDateRange } from '../../actions'
import { fetchRooms, formatDate } from '../../utils'
import { debounce } from 'lodash'

export const Main = () => {
	const [rooms, setRooms] = useState([])
	const [isCalendarVisible, setIsCalendarVisible] = useState(false)

	//const [dateRange, setDateRange] = useState({
	//	startDate: new Date(),
	//	endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // +1 день; если домножить на 7, то +1 неделя
	//	key: 'selection',
	//})
	const { startDate, endDate } = useSelector(state => state.dateRange)

	const dispatch = useDispatch()

	useEffect(() => {
		//request('/rooms').then(({ data }) => setRooms(data))
		fetchRooms(startDate, endDate).then(data => setRooms(data))

		if (formatDate(endDate) !== formatDate(startDate)) {
			setIsCalendarVisible(false)
		}
	}, [endDate])

	const handleDateRangeChange = item => {
		dispatch(setDateRange(item.selection.startDate, item.selection.endDate))
	}

	const handleSearch = () => {
		fetchRooms(startDate, endDate)
		dispatch({ type: 'SET_DATE', payload: { startDate, endDate } })
	}

	const endEdge = document.querySelectorAll('.rdrDay span .rdrEndEdge')[0]
	const monthAndYearWrapper = document.querySelector('.rdrMonthAndYearWrapper')
	const monthsWrapper = document.querySelectorAll('.rdrMonths.rdrMonthsVertical')[0]
	const dateInputElements = document.querySelectorAll('.rdrDateInput')
	const dateInputElement = document.querySelectorAll('.rdrDateInput')[0]

	if (dateInputElement) {
		dateInputElement.classList.remove('rdrDateDisplayItemActive')
	}

	if (!isCalendarVisible && monthAndYearWrapper && monthsWrapper) {
		// Изначально скрываем блоки
		monthAndYearWrapper.style.display = 'none'
		monthsWrapper.style.display = 'none'

		dateInputElements.forEach(dateInput => {
			dateInput.addEventListener('click', () => {
				// Показываем блоки при клике на dateInput
				setIsCalendarVisible(!isCalendarVisible)
			})
		})
	}

	if (isCalendarVisible) {
		monthAndYearWrapper.style.display = 'flex'
		monthsWrapper.style.display = 'flex'
	}

	return (
		<main className="main">
			<h1 className="visually-hidden">dopadev's hotel</h1>
			{/* TODO loader */}
			<Calendar />

			{/*<button onClick={handleSearch}>Search</button>*/}
			{rooms.length ? (
				<ul className="room-list">
					{rooms
						.sort((a, b) => a.number - b.number)
						.map(({ id, number, info, price, images, status, bookings }) => (
							<RoomCard
								key={id}
								id={id}
								number={number}
								info={info}
								price={price}
								images={images}
								status={status}
								bookings={bookings}
							/>
						))}
				</ul>
			) : (
				<div className="rooms-not-found">
					<h1>Rooms not found</h1>
				</div>
			)}
			{/* TODO pagination */}
		</main>
	)
}
