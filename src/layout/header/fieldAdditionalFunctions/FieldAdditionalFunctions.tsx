import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './fieldAdditionalFunctions.scss'
import {getBirthdays, getMajorCurrencyRates, getTasksForToday} from './helper'
import { changeFormatCurrency } from '../../../helpers'
import { URLRequestCurrencyToday } from '../../../consts'
import { Store } from '../../../store/interface'
import { CATCH_ERRORS, CURRENCY_SUCCESS, PRELOADER_LAUNCH, PRELOADER_STOP } from '../../../store/types'
import NavigationCard from './navigationCard/NavigationCard'
import getRequestService from '../../../services/getRequestService'


interface FieldAdditionalFunctionsProps {
	isOpen: boolean
	changeState: () => void
}

const FieldAdditionalFunctions: React.FC<FieldAdditionalFunctionsProps> = ({ isOpen = false, changeState }) => {

	const { currencyForToday } = useSelector((store: Store) => ({
		currencyForToday: store.CurrencyRequest.currencyForToday,
	}))
	const { contacts } = useSelector((store: Store) => ({
		contacts: store.Contacts.contacts,
	}))
	const { todoList } = useSelector((store: Store) => ({
		todoList: store.TodoList.todoList,
	}))

	const dispatch = useDispatch()

	async function getFetchCurrencyForToday() {
		dispatch({ type: PRELOADER_LAUNCH })
		try {
			const currencyForToday = await getRequestService(URLRequestCurrencyToday)
			dispatch({ type: PRELOADER_STOP })
			const currencyForTodayNewFormat = changeFormatCurrency(currencyForToday.data)
			dispatch({ type: CURRENCY_SUCCESS, payload: currencyForTodayNewFormat })
		} catch (error) {
				dispatch({ type: PRELOADER_STOP })
				dispatch({ type: CATCH_ERRORS, payload: error })
			throw error
			}
	}

	useEffect(() => {
		currencyForToday === null && getFetchCurrencyForToday()
		currencyForToday !== null && getMajorCurrencyRates(currencyForToday)
	}, [currencyForToday])


	return (
		<div className='fieldAdditionalFunctions flex'>
			{isOpen ? (
				<Fragment>
					<i className='material-icons up' onClick={changeState}>double_arrow</i>
					<div className='flex boxAdditionalFunctions'>
						<NavigationCard
							title='Currency'
							link='/currencyDetails'
							text={currencyForToday !== null ? getMajorCurrencyRates(currencyForToday) : ['']}
						/>
						<NavigationCard
							title='Contacts'
							link='/contactsDetails'
							text={getBirthdays(contacts)}
						/>
						<NavigationCard
							title='To do list'
							link='/todoList'
							text={getTasksForToday(todoList)}
						/>
					</div>
				</Fragment>
			) : (
			<Fragment>
					<i className='material-icons down' onClick={changeState}>double_arrow</i>
					<ul className='flex boxAdditionalFunctions'>
						<li>
							<Link to='/currencyDetails'>Currency</Link>
						</li>
						<li>
							<Link to='/contactsDetails'>Contacts</Link>
						</li>
						<li>
							<Link to='/todoList'>To do list</Link>
						</li>
					</ul>
			</Fragment>
			)}
		</div>
	)
}

export default FieldAdditionalFunctions
