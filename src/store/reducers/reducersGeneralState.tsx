import { CATCH_ERRORS, PRELOADER_LAUNCH, PRELOADER_STOP } from '../types'
import { GeneralStateInterface } from '../interface'

const initialState: GeneralStateInterface = {
	isLoading: false,
	error: {
		message: '',
		name: '',
		stack: '',
	},
}

export function GeneralState(state = initialState, action: any) {
	switch (action.type) {
		case PRELOADER_LAUNCH: {
			const newState: GeneralStateInterface = {
				...state,
				isLoading: true,
			}
			return newState
		}

		case PRELOADER_STOP: {
			const newState: GeneralStateInterface = {
				...state,
				isLoading: false,
			}
			return newState
		}

		case CATCH_ERRORS: {
			const newState: GeneralStateInterface = {
				...state,
				error: action.payload,
			}
			return newState
		}

		default: {
			return state
		}
	}
}
