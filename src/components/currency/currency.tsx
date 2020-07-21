import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Currency.scss'
import { URLRequestCurrencyToday } from '../../consts'
import { Store } from '../../store/interface'
import { CATCH_ERRORS, CURRENCY_SUCCESS, PRELOADER_LAUNCH, PRELOADER_STOP } from '../../store/types'
import getRequestService from '../../services/getRequestService'



const CurrenciesBlock: React.FC = () => {
	const { currencyForToday } = useSelector((store: Store) => ({
		currencyForToday: store.CurrencyRequest.currencyForToday,
	}))
	const [isOpen, setOpen] = useState()
	const dispatch = useDispatch()
	async function getFetchCurrencyForToday() {
		dispatch({ type: PRELOADER_LAUNCH })
		await getRequestService(URLRequestCurrencyToday)
			.then((result) => {
				dispatch({ type: PRELOADER_STOP })
				dispatch({ type: CURRENCY_SUCCESS, payload: result.data })
			})
			.catch((result) => {
				dispatch({ type: PRELOADER_STOP })
				dispatch({ type: CATCH_ERRORS, payload: result })
			})
		setOpen(true)
	}

	useEffect(() => {
		currencyForToday !== null && setOpen(true)
		!isOpen && currencyForToday === null && getFetchCurrencyForToday()
	}, [])

	return isOpen ? (
		<div className='box currency-container'>
			<h5>Currency</h5>
			{	currencyForToday !== null &&
				currencyForToday.map((item) => {
					return (
						item.curAbbreviation === 'USD' ||
						item.curAbbreviation === 'RUB' ||
						item.curAbbreviation === 'EUR') && (
						<div key={item.curID} className='currency-row flex'>
							<p className='currency-scale'>{`${item.curScale} BUN `}</p>
							<p className='currency-rate'>{` ${item.curOfficialRate} ${item.curAbbreviation}`}</p>
						</div>
					)
				})}
			<p className='currency-details'>
				<Link to={'/currencyDetails'}>Details</Link>
			</p>
		</div>
	) : (
		<div></div>
	)
}

export default CurrenciesBlock
