import { DateRange } from 'react-date-range'
import { useDispatch, useSelector } from 'react-redux'
import { setDateRange } from '../../../../actions'
import 'react-date-range/dist/styles.css' // основной стиль
import 'react-date-range/dist/theme/default.css' // тема по умолчанию
import '../../date-range-styles.css'
import '../../main.css'

export const Calendar = () => {
	const { startDate, endDate } = useSelector(state => state.dateRange)

	const dispatch = useDispatch()

	const handleDateRangeChange = item => {
		dispatch(setDateRange(item.selection.startDate, item.selection.endDate))
	}

	return (
		<DateRange
			editableDateInputs={false}
			onChange={handleDateRangeChange}
			moveRangeOnFirstSelection={false}
			showSelectionPreview={false}
			//direction="horizontal"
			maxDate={new Date(2100, 11, 31)}
			weekStartsOn={1}
			ranges={[
				{
					startDate: startDate,
					endDate: endDate,
					key: 'selection',
				},
			]}
		/>
	)
}
