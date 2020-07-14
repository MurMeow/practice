import {
	CURRENCY_SUCCESS,
	CURRENCY_REQUEST_HISTORY,
	CURRENCY_HISTORY_SET_CURRENCY,
	CURRENCY_HISTORY_SET_DATE,
} from '../types'
import { CurrencyState } from '../interface'
import moment from 'moment'

const initialState: CurrencyState = {
	currencyForToday: null,
	currencyHistory: [],
	soughtCurrency: {
		curID: 145,
		curAbbreviation: 'USD',
	},
	soughtDate: {
		startDate: moment().add(-10, 'days').utc().format(),
		endDate: moment.utc().format(),
	},
}

export function CurrencyRequest(state = initialState, action: any) {
	switch (action.type) {
		case CURRENCY_SUCCESS: {
			const newState: CurrencyState = {
				...state,
				currencyForToday: action.payload,
			}
			return newState
		}

		case CURRENCY_REQUEST_HISTORY: {
			const newState: CurrencyState = {
				...state,
				currencyHistory: action.payload,
			}
			return newState
		}

		case CURRENCY_HISTORY_SET_CURRENCY: {
			const newState: CurrencyState = {
				...state,
				soughtCurrency: action.payload,
			}
			return newState
		}

		case CURRENCY_HISTORY_SET_DATE: {
			const newState: CurrencyState = {
				...state,
				soughtDate: action.payload,
			}
			return newState
		}

		default: {
			return state
		}
	}
}
