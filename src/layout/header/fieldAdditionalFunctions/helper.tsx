import { Contact, CurrencyData, Todo } from '../../../store/interface'
import moment from 'moment'

export const getMajorCurrencyRates = (currency: CurrencyData[]): string[] => {
	const defaultCurrencies = ['USD', 'RUB', 'EUR']
	const mainCurrency = currency.filter((item) => defaultCurrencies.includes(item.curAbbreviation))
	return mainCurrency.map(
		(item) => `${item.curScale} BUN - ${item.curOfficialRate} ${item.curAbbreviation}`
	)
}

export const getBirthdays = (contacts: Contact[]): string[] => {
	const todayBirthdays = contacts.filter((item) => {
		return (
			moment(item.birthday, 'YYYY-MM-DD').month() === moment().month() &&
			moment(item.birthday, 'YYYY-MM-DD').date() === moment().date()
		)
	})
	return todayBirthdays.map((item) => `${item.name} - ${item.birthday}`)
}

export const getTasksForToday = (tasks: Todo[]) => {
	const tasksForToday = tasks.filter((item) => {
		return item.date === moment().format('YYYY-MM-DD')
	})
	return tasksForToday.map((item) => `- ${item.todo}`)
}
