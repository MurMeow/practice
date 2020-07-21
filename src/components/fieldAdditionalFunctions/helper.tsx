import {Contact, CurrencyData} from '../../store/interface'

export const getMajorCurrencyRates = (currency:CurrencyData[]):string[]=> {
	const defaultCurrencies = ['USD', 'RUB', 'EUR']
	const mainCurrency =  currency.filter(
		item => defaultCurrencies.includes(item.curAbbreviation)
	)
	return mainCurrency.map( item => `${item.curScale} BUN - ${item.curOfficialRate} ${item.curAbbreviation}` )
}

export const getBirthdays = (contacts:Contact[]):string[]=> {
	const todayBirthdays = contacts.filter(item => item.birthday === '01.01.1990')
	return todayBirthdays.map( item => `${item.name} - ${item.birthday}` )
}