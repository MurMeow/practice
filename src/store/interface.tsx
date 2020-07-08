export interface Store {
	CurrencyRequest: CurrencyState
	GeneralState: GeneralStateInterface
}

export interface GeneralStateInterface {
	isLoading: boolean
	error: ErrorInterface
}

export interface ErrorInterface {
	message: string
	name: string
	stack: string
}

export interface CurrencyState {
	currencyForToday: CurrencyData[]
	currencyHistory: CurrencyHistory[]
	soughtCurrency: SoughtCurrency
	soughtDate: SoughtDate
}

export interface CurrencyHistory {
	Cur_ID: number
	Date: string
	Cur_OfficialRate: number
}

export interface CurrencyData {
	Cur_ID: number
	Date: string
	Cur_Abbreviation: string
	Cur_Scale: number
	Cur_Name: string
	Cur_OfficialRate: number
}

export interface SoughtCurrency {
	curID: number
	curAbbreviation: string
}

export interface SoughtDate {
	startDate: string
	endDate: string
}
