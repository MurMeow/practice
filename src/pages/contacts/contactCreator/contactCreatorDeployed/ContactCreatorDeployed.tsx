import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import throttle from 'lodash/throttle'
import './contactCreatorDeployed.scss'
import { Contact } from '../../../../store/interface'
import { CREATE_NEW_CONTACT } from '../../../../store/types'
import isValidDataService from '../../../../services/isValidDataService'
import { GET_TIMEOUT_INPUT_DELAY } from '../../../../consts'
import moment from 'moment'

export interface ValidationErrors {
	name: string
	phone?: string
	email?: string
	birthday?: string
	address?: string
}

const ContactCreatorDeployed: React.FC = () => {
	const [newContact, setNewContact] = useState<Contact>({
		name: '',
		phone: '',
		email: '',
		birthday: '',
		address: '',
	})

	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
		name: '',
		phone: '',
		email: '',
		birthday: '',
		address: '',
	})

	const [stateIsValidForm, setIsValidForm] = useState<boolean>(false)
	const [updateStateIsValidForm, setUpdateStateIsValidForm] = useState<boolean>(false)

	const dispatch = useDispatch()

	const addNewContact = () => {
		if (stateIsValidForm) {
			const correctDateMomentFormat =
				moment(newContact.birthday).format('YYYY-MM-DD') === 'Invalid date'
					? ''
					: moment(newContact.birthday).format('YYYY-MM-DD')
			dispatch({
				type: CREATE_NEW_CONTACT,
				payload: { ...newContact, birthday: correctDateMomentFormat },
			})
			setNewContact({
				name: '',
				email: '',
				phone: '',
				birthday: '',
				address: '',
			})
			setValidationErrors({
				name: '',
				email: '',
				phone: '',
				birthday: '',
				address: '',
			})
			setIsValidForm(false)
			setUpdateStateIsValidForm(false)
		}
	}

	const isValidValue = (event: any) => {
		const name = event.target.name
		const value = event.target.value
		switch (name) {
			case 'name':
				setValidationErrors({ ...validationErrors, name: isValidDataService.isValidName(value) })
				break
			case 'phone':
				setValidationErrors({ ...validationErrors, phone: isValidDataService.isValidPhone(value) })
				break
			case 'email':
				setValidationErrors({ ...validationErrors, email: isValidDataService.isValidEmail(value) })
				break
			case 'birthday':
				setValidationErrors({
					...validationErrors,
					birthday: isValidDataService.isValidDate(value),
				})

				break
		}
	}

	const onChangeInputHandler = async (event: any) => {
		setUpdateStateIsValidForm(false)
		const name = event.target.name
		const value = event.target.value
		switch (name) {
			case 'name':
				await setNewContact({ ...newContact, name: value })
				if (validationErrors.name !== '') {
					throttle(
						() => {
							setValidationErrors({
								...validationErrors,
								name: isValidDataService.isValidName(value),
							})
						},
						GET_TIMEOUT_INPUT_DELAY,
						{ trailing: true }
					)()
				}
				break
			case 'phone':
				await setNewContact({ ...newContact, phone: value })
				if (validationErrors.phone !== '') {
					throttle(
						() => {
							setValidationErrors({
								...validationErrors,
								phone: isValidDataService.isValidPhone(value),
							})
						},
						GET_TIMEOUT_INPUT_DELAY,
						{ trailing: true }
					)()
				}
				break
			case 'email':
				await setNewContact({ ...newContact, email: value })
				if (validationErrors.email !== '') {
					throttle(
						() => {
							setValidationErrors({
								...validationErrors,
								email: isValidDataService.isValidEmail(value),
							})
						},
						GET_TIMEOUT_INPUT_DELAY,
						{ trailing: true }
					)()
				}
				break
			case 'birthday':
				await setNewContact({ ...newContact, birthday: value })
				if (validationErrors.birthday !== '') {
					throttle(
						() => {
							setValidationErrors({
								...validationErrors,
								birthday: isValidDataService.isValidDate(value),
							})
						},
						GET_TIMEOUT_INPUT_DELAY,
						{ trailing: true }
					)()
				}
				break
			case 'address':
				await setNewContact({ ...newContact, address: value })
				break
		}
	}

	const onKeyUpHandler = async (event: any) => {
		if (event.keyCode === 13) {
			setValidationErrors({
				...validationErrors,
				name: isValidDataService.isValidName(newContact.name),
				phone: isValidDataService.isValidPhone(newContact.phone),
				email: isValidDataService.isValidEmail(newContact.email),
				birthday: isValidDataService.isValidDate(newContact.birthday),
			})
			setUpdateStateIsValidForm(true)
		}
	}

	const onChangeSubmitHandler = () => {
		setValidationErrors({
			...validationErrors,
			name: isValidDataService.isValidName(newContact.name),
			phone: isValidDataService.isValidPhone(newContact.phone),
			email: isValidDataService.isValidEmail(newContact.email),
			birthday: isValidDataService.isValidDate(newContact.birthday),
		})
		setUpdateStateIsValidForm(true)
	}

	const onBlurFormHandler = () => {
		setUpdateStateIsValidForm(false)
		newContact.name === '' &&
			newContact.phone === '' &&
			newContact.email === '' &&
			newContact.birthday === '' &&
			setValidationErrors({
				name: '',
				email: '',
				phone: '',
				birthday: '',
				address: '',
			})
	}

	useEffect(() => {
		setIsValidForm(
			updateStateIsValidForm && !Object.values(validationErrors).some((error) => error.length !== 0)
		)
		addNewContact()
	}, [newContact, validationErrors, updateStateIsValidForm, stateIsValidForm])

	return (
		<div className='contact-form'>
			<h5 className='contact-form__title-form'>Form new Contact</h5>

			{Object.values(validationErrors).map((item) => {
				return <p>{item}</p>
			})}

			<form onKeyUp={onKeyUpHandler} onBlur={onBlurFormHandler}>
				<div className='flex block-for-input-icon'>
					<label htmlFor='label_input_name'>
						<i className='material-icons input-icon'>personal</i>
					</label>
					<input
						type='text'
						name='name'
						placeholder='name'
						value={newContact.name}
						maxLength={20}
						id='label_input_name'
						onChange={onChangeInputHandler}
						onBlur={isValidValue}
					/>
				</div>
				<div className='flex block-for-input-icon'>
					<label htmlFor='label_input_phone'>
						<i className='material-icons input-icon phone'>call</i>
					</label>
					<input
						type='text'
						name='phone'
						placeholder='phone'
						value={newContact.phone}
						maxLength={18}
						id='label_input_phone'
						onBlur={isValidValue}
						onChange={onChangeInputHandler}
					/>
				</div>
				<div className='flex block-for-input-icon'>
					<label htmlFor='label_input_email'>
						<i className='material-icons input-icon email'>alternate_email</i>
					</label>
					<input
						type='text'
						name='email'
						placeholder='email'
						value={newContact.email}
						maxLength={25}
						id='label_input_email'
						onChange={onChangeInputHandler}
						onBlur={isValidValue}
					/>
				</div>
				<div className='flex block-for-input-icon'>
					<label htmlFor='label_input_birthday'>
						<i className='material-icons input-icon birthday'>date_range</i>
					</label>
					<input
						type='text'
						name='birthday'
						placeholder='birthday YYYY-MM-DD'
						value={newContact.birthday}
						maxLength={15}
						id='label_input_birthday'
						onChange={onChangeInputHandler}
						onBlur={isValidValue}
					/>
				</div>
				<div className='flex block-for-input-icon'>
					<label htmlFor='label_input_address'>
						<i className='material-icons input-icon address'>home</i>
					</label>
					<input
						type='text'
						name='address'
						placeholder='address'
						value={newContact.address}
						maxLength={50}
						id='label_input_address'
						onChange={onChangeInputHandler}
					/>
				</div>

				<input type='button' value='save' onClick={onChangeSubmitHandler} />
			</form>
		</div>
	)
}

export default ContactCreatorDeployed
