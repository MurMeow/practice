export interface Store {
	CurrencyRequest: CurrencyState
	GeneralState: GeneralStateInterface
	Contacts: ContactState
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
	currencyForToday: CurrencyData[] | null
	currencyHistory: CurrencyHistory[]
	soughtCurrency: SoughtCurrency
	soughtDate: SoughtDate
}

export interface CurrencyHistory {
	curID: number
	date: string
	curOfficialRate: number
}

export interface CurrencyData {
	curID: number
	date: string
	curAbbreviation: string
	curScale: number
	curName: string
	curOfficialRate: number
}

export interface SoughtCurrency {
	curID: number
	curAbbreviation: string
}

export interface SoughtDate {
	startDate: string
	endDate: string
}

export interface ContactState {
	contacts: Contact[]
}

export interface Contact {
	name: string
	email?: string
	phone: string
	birthday?: string
	address?: string
}
