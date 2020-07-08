import React, { useEffect, useState } from 'react'
import LineChart from '../../components/Chart/Chart'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { URLRequestCurrencyHistory, URLRequestCurrencyToday } from '../../consts'
import { useDispatch, useSelector } from 'react-redux'
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
import moment from 'moment'
import { Store } from '../../store/interface'
import { parseDateForChart, parseValueForChart } from './helper'
import ButtonDropdownParameters from '../../components/app/buttonDropdown/ButtonDropdown'
import { stringify } from 'querystring'

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
		await getRequestService(
			`${URLRequestCurrencyHistory}${curID}?startDate=${startDate}&endDate=${endDate}`
		)
			.then((result) => {
				dispatch({ type: PRELOADER_STOP })
				dispatch({ type: CURRENCY_REQUEST_HISTORY, payload: result })
			})
			.catch((result) => {
				dispatch({ type: PRELOADER_STOP })
				dispatch({ type: CATCH_ERRORS, payload: result })
			})
		return
	}
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
		return
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

	useEffect(() => {
		currencyForToday.length === 0 && getFetchCurrencyForToday()
		getFetchCurrencyHistory(soughtCurrency.curID, soughtDate.startDate, soughtDate.endDate)
	}, [soughtCurrency.curID, soughtDate.startDate, soughtDate.endDate])
	return (
		<div className='currencyDetails-block'>
			<div className='history-block flex'>
				<div className='detailHistory'>
					<div className='flex'>
						<h2>Course history</h2>
						<ButtonDropdownParameters
							value={currencyForToday.map((item) => item.Cur_Abbreviation)}
						/>
					</div>
					<div className='flex date'>
						<div className='detailHistory-block'>
							<p>Choose a start date:</p>
							<Calendar
								calendarType='US'
								locale='en-US'
								onChange={(value) => {
									const time = 366 * 24 * 60 * 60 * 1000
									const newDateNumber = Number(new Date(String(value)))
									const endDateNumber = Number(new Date(String(endDate)))
									console.log(newDateNumber > endDateNumber - time)
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
						onClick={() => setDateForFetch(startDate, endDate)}
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
