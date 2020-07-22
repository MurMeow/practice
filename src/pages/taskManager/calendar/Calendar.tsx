import React, {useEffect, useState} from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import './calendar.scss'
import { setDateForWeekDay, WeekWithDate } from './helper'
import ElementCalendarDay from './elementCalendarDay/ElementCalendarDay'


const Calendar: React.FC = () => {

	const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'))
	const [weekWithDate, setWeekWithDate] = useState<WeekWithDate[]>()

	const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

	const showPreviousWeek = () => {
		setDate(moment(date).subtract(7, 'days').format('YYYY-MM-DD'))
	}

	const showNextWeek = () => {
		setDate(moment(date).add(7, 'days').format('YYYY-MM-DD'))
	}

	useEffect(() => {
		setWeekWithDate(setDateForWeekDay(week, date))
	}, [date])

	return (
		<div className='todo-list flex'>
			<i className='material-icons' onClick={() => showPreviousWeek()}>arrow_back_ios</i>
			{weekWithDate?.map( (item) => {
				const externalId = uuidv4()
				return (
					<div key={externalId} className='box calendar-day'>
						<h5>{item.date}</h5>
						<p>{item.weekday}</p>
						<ElementCalendarDay date={item.date}/>
					</div>
				)
			})}
			<i className='material-icons' onClick={() => showNextWeek()}>arrow_forward_ios</i>
		</div>
	)
}


export default Calendar