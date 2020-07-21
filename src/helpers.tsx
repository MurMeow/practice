
export interface CurrencyDataReceived {
	Cur_ID: number
	Date: string
	Cur_Abbreviation: string
	Cur_Scale: number
	Cur_Name: string
	Cur_OfficialRate: number
}

export const changeFormatCurrency = (currency:CurrencyDataReceived[]) => {
	return currency.map( item => {
		return {
			curID: item.Cur_ID,
			date: item.Date,
			curAbbreviation: item.Cur_Abbreviation,
			curScale: item.Cur_Scale,
			curName: item.Cur_Name,
			curOfficialRate: item.Cur_OfficialRate}
	})

}