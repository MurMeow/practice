import { CurrencyHistory} from '../../store/interface'
import moment from 'moment'


export interface CurrencyHistoryReceived {
	Cur_ID: number
	Date: string
	Cur_OfficialRate: number
}

export const parseDateForChart = (currencyHistory: CurrencyHistory[]) => {
	return currencyHistory.map((item) => {
		return moment(item.date).format('MM-DD-YYYY')
	})
}
export const parseValueForChart = (currencyHistory: CurrencyHistory[]) => {
	return currencyHistory.map((item) => {
		return item.curOfficialRate
	})
}

export const changeFormatCurrencyHistory = (currencyHistory:CurrencyHistoryReceived[]) => {
	return currencyHistory.map( item => {
		return {
			curID: item.Cur_ID,
			date: item.Date,
			curOfficialRate: item.Cur_OfficialRate
			}
	})
}