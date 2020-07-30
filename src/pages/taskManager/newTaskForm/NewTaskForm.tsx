import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './newTaskForm.scss'
import { CREATE_NEW_TODO } from '../../../store/types'
import isValidDataService from '../../../services/isValidDataService'
import { v4 as uuidv4 } from 'uuid'
import throttle from 'lodash/throttle'
import { GET_TIMEOUT_INPUT_DELAY } from '../../../consts'
import moment from 'moment'

export interface NewTaskFormProps {
	specialClass: string
}

interface ValidationErrors {
	newTask: string
	date?: string
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ specialClass }) => {
	const [newTask, setNewTask] = useState<string>('')
	const [dateNewTask, setDateNewTask] = useState<string>('')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
		newTask: '',
		date: '',
	})
	const [stateIsValidForm, setIsValidForm] = useState<boolean>(false)
	const [updateStateIsValidForm, setUpdateStateIsValidForm] = useState<boolean>(false)

	const dispatch = useDispatch()

	const addNewTask = () => {
		if (stateIsValidForm) {
			const correctDateMomentFormat =
				moment(dateNewTask).format('YYYY-MM-DD') === 'Invalid date'
					? ''
					: moment(dateNewTask).format('YYYY-MM-DD')
			const externalId = uuidv4()
			dispatch({
				type: CREATE_NEW_TODO,
				payload: {
					todo: newTask,
					date: correctDateMomentFormat,
					isActiveStatus: true,
					id: externalId,
				},
			})
			setNewTask('')
			setDateNewTask('')
			setIsValidForm(false)
			setUpdateStateIsValidForm(false)
		}
	}

	const onChangeSubmitHandler = () => {
		setValidationErrors({ ...validationErrors, date: isValidDataService.isValidDate(dateNewTask) })
		setUpdateStateIsValidForm(true)
	}

	const onChangeInputHandler = async (event: any) => {
		setUpdateStateIsValidForm(false)
		const name = event.target.name
		const value = event.target.value
		switch (name) {
			case 'todo':
				await setNewTask(value)
				break
			case 'date':
				await setDateNewTask(value)
				if (validationErrors.date !== '') {
					throttle(
						() => {
							setValidationErrors({
								...validationErrors,
								date: isValidDataService.isValidDate(value),
							})
						},
						GET_TIMEOUT_INPUT_DELAY,
						{ trailing: true }
					)()
				}
				break
		}
	}

	const onKeyUpHandler = (event: any) => {
		if (event.keyCode === 13) {
			setValidationErrors({
				...validationErrors,
				date: isValidDataService.isValidDate(dateNewTask),
			})
			setUpdateStateIsValidForm(true)
		}
	}

	const onBlurFormHandler = () => {
		setUpdateStateIsValidForm(false)
		newTask === '' &&
			dateNewTask === '' &&
			setValidationErrors({
				newTask: '',
				date: '',
			})
	}

	useEffect(() => {
		setIsValidForm(
			updateStateIsValidForm && !Object.values(validationErrors).some((error) => error.length !== 0)
		)
		addNewTask()
	}, [newTask, dateNewTask, validationErrors, updateStateIsValidForm, stateIsValidForm])

	return (
		<div className={`task-form ${specialClass}`}>
			<h5 className='task-form__title-form'>Form new task</h5>
			<form onKeyUp={onKeyUpHandler} onBlur={onBlurFormHandler}>
				<input
					type='text'
					name='todo'
					maxLength={40}
					placeholder='todo'
					onChange={onChangeInputHandler}
					value={newTask}
				/>
				<div className='flex'>
					<input
						type='text'
						name='date'
						placeholder='YYYY-MM-DD'
						onChange={onChangeInputHandler}
						value={dateNewTask}
					/>
					<input type='button' value='save' onClick={onChangeSubmitHandler} />
					<i className='material-icons' onClick={onChangeSubmitHandler}>
						control_pointer
					</i>
				</div>
			</form>
			{Object.values(validationErrors).map((item) => {
				const externalId = uuidv4()
				return <p key={externalId}>{item}</p>
			})}
		</div>
	)
}

export default NewTaskForm
