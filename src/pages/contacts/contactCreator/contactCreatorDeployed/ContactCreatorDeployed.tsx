import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './contactCreatorDeployed.scss'
import { Contact } from '../../../../store/interface'
import { CREATE_NEW_CONTACT } from '../../../../store/types'


const ContactCreatorDeployed: React.FC = () => {

	const [newContact, setNewContact] = useState<Contact>({
		name: '',
		email: '',
		phone: '',
		birthday: '',
		address: ''
	})

	const dispatch = useDispatch()

	const addNewContact = (newContact:Contact) => {
		dispatch({
			type: CREATE_NEW_CONTACT,
			payload: newContact,
		})
		setNewContact({
			name: '',
			email: '',
			phone: '',
			birthday: '',
			address: ''
		})
	}

	useEffect(() => {
	}, [newContact])

	return (
		<div className='contact-form'>
			<h5 className='contact-form__title-form'>Form new Contact</h5>

			<form onKeyUp={(event) => event.keyCode === 13 && addNewContact(newContact)}>

				<div className='flex block-for-input-icon name'>
					<i className='material-icons input-icon name' >personal_outline</i>
					<input type='text' placeholder='name' onChange={event => setNewContact({...newContact, name: event.target.value} )} value={newContact.name}/>
				</div>
				<div className='flex block-for-input-icon phone'>
					<i className='material-icons input-icon phone'>call</i>
					<input type='text' placeholder='phone' onChange={event => setNewContact({...newContact, phone: event.target.value} )} value={newContact.phone}/>
				</div>
				<div className='flex block-for-input-icon'>
					<i className='material-icons input-icon email'>alternate_email</i>
					<input type='text' placeholder='email' onChange={event => setNewContact({...newContact, email: event.target.value} )} value={newContact.email}/>
				</div>
				<div className='flex block-for-input-icon'>
					<i className='material-icons input-icon birthday'>date_range</i>
					<input type='text' placeholder='birthday' onChange={event => setNewContact({...newContact, birthday: event.target.value} )} value={newContact.birthday}/>
				</div>
				<div className='flex block-for-input-icon'>
					<i className='material-icons input-icon address'>home</i>
					<input type='text' placeholder='address' onChange={event => setNewContact({...newContact, address: event.target.value} )} value={newContact.address}/>
				</div>

				<input type='button' value='save' onClick={() => addNewContact(newContact)}/>
			</form>
		</div>
	)
}

export default ContactCreatorDeployed