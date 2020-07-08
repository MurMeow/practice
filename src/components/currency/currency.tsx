import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Currency.scss'
import { Store } from '../../store/interface'
import getRequestService from '../../services/getRequestService'
import { CATCH_ERRORS, CURRENCY_SUCCESS, PRELOADER_LAUNCH, PRELOADER_STOP } from '../../store/types'
import { Link } from 'react-router-dom'
import { URLRequestCurrencyToday } from '../../consts'

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
		currencyForToday !== [] && currencyForToday !== undefined && setOpen(true)
		!isOpen && currencyForToday.length === 0 && getFetchCurrencyForToday()
	}, [])

	return isOpen ? (
		<div className='box currency-container'>
			<h5>Currency</h5>
			{currencyForToday !== [] &&
				currencyForToday !== undefined &&
				currencyForToday.map((item) => {
					if (
						item.Cur_Abbreviation === 'USD' ||
						item.Cur_Abbreviation === 'RUB' ||
						item.Cur_Abbreviation === 'EUR'
					) {
						return (
							<div key={item.Cur_ID} className='currency-row flex'>
								<p className='currency-scale'>{`${item.Cur_Scale} BUN `}</p>
								<p className='currency-rate'>{` ${item.Cur_OfficialRate} ${item.Cur_Abbreviation}`}</p>
							</div>
						)
					}
					return <div></div>
				})}
			<p className='currency-details'>
				<Link to={'/currencyDetails'}>Details</Link>
			</p>
		</div>
	) : (
		<div></div>
	)
}

// const mapStateToProps = (store: Store) => {
// 	// const isLoading = store.isLoading
// 	// const error = store.error
// 	// const currency = store.currency
// 	return { isLoading: store.isLoading, error: store.error, currency: store.currency }
// }
//
// const mapDispatchToProps = () => {
// 	return
// }
//
// export default connect(mapStateToProps, { mapDispatchToProps })(Currency)
export default CurrenciesBlock
