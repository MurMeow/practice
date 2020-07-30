import React, { useEffect, useState } from 'react'
import './errorBlock.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store/interface'
import { CATCH_ERRORS } from '../../store/types'

const ErrorBlock: React.FC = () => {
	const [isOpen, onChangeIsOpen] = useState(false)
	const dispatch = useDispatch()
	const { error } = useSelector((store: Store) => ({
		error: store.GeneralState.error,
	}))

	const closeCardError = () => {
		dispatch({
			type: CATCH_ERRORS,
			payload: {
				message: '',
				name: '',
				stack: '',
			},
		})
		onChangeIsOpen(false)
	}

	const onClickButtonHandler = () => {
		closeCardError()
	}

	useEffect(() => {
		error.name !== '' ? onChangeIsOpen(true) : onChangeIsOpen(false)
	}, [error])

	return isOpen ? (
		<div className='card-error-container'>
			<div className='background'></div>
			<div className='card-error box'>
				<div className='text-block'>
					<h3>{error.name}</h3>
					<p>{error.message}</p>
					<p>{error.stack}</p>
				</div>
				<div className='button' onClick={onClickButtonHandler}>
					<button>Close</button>
				</div>
			</div>
		</div>
	) : (
		<div></div>
	)
}

export default ErrorBlock
