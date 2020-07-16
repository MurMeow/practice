import moment from 'moment'

export interface WeekWithDate {
	weekday: string
	date: string
}

export const setDateForWeekDay = (weekDays:string[], date:string):WeekWithDate[] => {
	const dateToday = moment(date).format('YYYY-MM-DD')
	const firstWeekDay = moment(dateToday).subtract(moment(date).day(),'days').format('YYYY-MM-DD')

	return weekDays.map( (item,index) => {
		return {
			weekday: item,
			date: moment(firstWeekDay).add(index,'days').format('YYYY-MM-DD')
		}
	})
}