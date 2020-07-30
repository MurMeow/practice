import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { URLRequestCurrencyHistory, URLRequestCurrencyToday } from '../../consts'
import LineChart from './Chart/Chart'
import './currencyDetails.scss'
import {
	CURRENCY_SUCCESS,
	CURRENCY_REQUEST_HISTORY,
	CURRENCY_HISTORY_SET_DATE,
	PRELOADER_LAUNCH,
	PRELOADER_STOP,
	CATCH_ERRORS,
} from '../../store/types'
import getRequestService from '../../services/getRequestService'
import { Store } from '../../store/interface'
import { changeFormatCurrencyHistory, parseDateForChart, parseValueForChart } from './helper'
import ButtonDropdownParameters from '../../components/buttonDropdown/ButtonDropdown'
import { changeFormatCurrency } from '../../helpers'

let courseValueOnDate: number[]
let dateForCourse: string[]

const CurrencyDetails: React.FC = () => {
	const { currencyHistory, currencyForToday, soughtCurrency, soughtDate } = useSelector(
		(store: Store) => ({
			currencyHistory: store.CurrencyRequest.currencyHistory,
			currencyForToday: store.CurrencyRequest.currencyForToday,
			soughtCurrency: store.CurrencyRequest.soughtCurrency,
			soughtDate: store.CurrencyRequest.soughtDate,
		})
	)
	const [startDate, onChangeStartDate] = useState(soughtDate.startDate)
	const [endDate, onChangeEndDate] = useState(soughtDate.endDate)

	if (currencyHistory !== []) {
		dateForCourse = parseDateForChart(currencyHistory)
		courseValueOnDate = parseValueForChart(currencyHistory)
	}
	const dispatch = useDispatch()
	async function getFetchCurrencyHistory(curID: number, startDate: string, endDate: string) {
		dispatch({ type: PRELOADER_LAUNCH })
		try {
			const currencyHistory = await getRequestService(
				`${URLRequestCurrencyHistory}${curID}?startDate=${startDate}&endDate=${endDate}`
			)
			dispatch({ type: PRELOADER_STOP })
			const currencyHistoryNewFormat = changeFormatCurrencyHistory(currencyHistory.data)
			dispatch({ type: CURRENCY_REQUEST_HISTORY, payload: currencyHistoryNewFormat })
		} catch (error) {
			dispatch({ type: PRELOADER_STOP })
			dispatch({ type: CATCH_ERRORS, payload: error })
			throw error
		}
	}
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
	const setDateForFetch = (startDate: string, endDate: string) => {
		dispatch({
			type: CURRENCY_HISTORY_SET_DATE,
			payload: {
				startDate: moment.utc(startDate).format(),
				endDate: moment.utc(endDate).format(),
			},
		})
	}

	const setDateForFetchHandler = () => {
		setDateForFetch(startDate, endDate)
	}

	useEffect(() => {
		currencyForToday === null &&
			(async function fetch() {
				await getFetchCurrencyForToday()
			})()
		;(async function fetch() {
			await getFetchCurrencyHistory(soughtCurrency.curID, soughtDate.startDate, soughtDate.endDate)
		})()
	}, [currencyForToday, soughtCurrency.curID, soughtDate.startDate, soughtDate.endDate])
	return (
		<div className='currencyDetails-block'>
			<div className='history-block flex'>
				<div className='detailHistory'>
					<div className='flex'>
						<h2>Course history</h2>
						{currencyForToday !== null && (
							<ButtonDropdownParameters
								value={currencyForToday.map((item) => item.curAbbreviation)}
							/>
						)}
					</div>
					<div className='flex date'>
						<div className='detailHistory-block'>
							<p>Choose a start date:</p>
							<Calendar
								calendarType='US'
								locale='en-US'
								onChange={(value) => {
									onChangeStartDate(value.toString())
								}}
								value={new Date(startDate)}
							/>
						</div>
						<div className='detailHistory-block'>
							<p>Choose a finish date:</p>
							<Calendar
								calendarType='US'
								locale='en-US'
								onChange={(value) => onChangeEndDate(value.toString())}
								value={new Date(endDate)}
							/>
						</div>
					</div>
					<h5
						className='detailHistory-block_button box'
						onClick={setDateForFetchHandler}
					>{`Show data from ${moment(startDate).format('MM DD YYYY')} to ${moment(endDate).format(
						'MM DD YYYY'
					)}`}</h5>
				</div>
				<div className='chart-block'>
					<LineChart type='Line' labels={dateForCourse} data={courseValueOnDate} />
				</div>
			</div>
		</div>
	)
}

export default CurrencyDetails
