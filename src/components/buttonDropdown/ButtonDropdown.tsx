import React, { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Store } from '../../store/interface'
import { CURRENCY_HISTORY_SET_CURRENCY } from '../../store/types'

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
		currencyForToday !== null && currencyForToday.forEach((obj) => {
			if (obj.curAbbreviation === item) {
				curParam = { curID: obj.curID, curAbbreviation: obj.curAbbreviation }
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
					const externalId = uuidv4()
					return (
						<DropdownItem key={externalId} onClick={() => setCurrency(item)}>
							{item}
						</DropdownItem>
					)
				})}
			</DropdownMenu>
		</ButtonDropdown>
	)
}

export default ButtonDropdownParameters
