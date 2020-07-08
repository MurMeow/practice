import React, { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../../store/interface'
import { CURRENCY_HISTORY_SET_CURRENCY } from '../../../store/types'

interface ButtonProps {
	value: string[]
}

interface CurParam {
	curID: number
	curAbbreviation: string
}

const ButtonDropdownParameters: React.FC<ButtonProps> = ({ value }) => {
	const dispatch = useDispatch()
	const [dropdownOpen, setOpen] = useState(false)
	const { soughtCurrency, currencyForToday } = useSelector((store: Store) => ({
		currencyForToday: store.CurrencyRequest.currencyForToday,
		soughtCurrency: store.CurrencyRequest.soughtCurrency,
	}))

	const toggle = () => setOpen(!dropdownOpen)
	const setCurrency = (item: string) => {
		let curParam: CurParam = {
			curID: soughtCurrency.curID,
			curAbbreviation: soughtCurrency.curAbbreviation,
		}
		currencyForToday.forEach((obj) => {
			if (obj.Cur_Abbreviation === item) {
				curParam = { curID: obj.Cur_ID, curAbbreviation: obj.Cur_Abbreviation }
			}
		})
		dispatch({
			type: CURRENCY_HISTORY_SET_CURRENCY,
			payload: curParam,
		})
	}

	return (
		<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle caret color='info'>
				{soughtCurrency.curAbbreviation}
			</DropdownToggle>
			<DropdownMenu style={{ overflowY: 'scroll', maxHeight: '6.5rem' }}>
				{value.map((item) => {
					return (
						<DropdownItem key={item} onClick={() => setCurrency(item)}>
							{item}
						</DropdownItem>
					)
				})}
			</DropdownMenu>
		</ButtonDropdown>
	)
}

export default ButtonDropdownParameters
