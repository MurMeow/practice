import { CurrencyHistory } from '../../store/interface'
import moment from 'moment'

export const parseDateForChart = (currencyHistory: CurrencyHistory[]) => {
	return currencyHistory.map((item) => {
		return moment(item.Date).format('MM-DD-YYYY')
	})
}
export const parseValueForChart = (currencyHistory: CurrencyHistory[]) => {
	return currencyHistory.map((item) => {
		return item.Cur_OfficialRate
	})
}
