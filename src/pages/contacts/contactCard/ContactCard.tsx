import React from 'react'
import './contactCard.scss'
import {calculateAge} from '../helper'

interface FieldAdditionalFunctionsProps {
	name: string
	address?: string
	email?: string
	phone: string
	birthday?: string
}

const ContactCard: React.FC<FieldAdditionalFunctionsProps> = ({name, address, email, birthday, phone}) => {

	return (
		<div className='contact-card'>
			<div className='flex person-mame'>
				<h5>{name}</h5>
				<i className="material-icons">cake</i>
				<p>{` (${calculateAge(birthday)} years)`}</p>
			</div>
			<div className={`photo ${name}`}></div>
			<p>{birthday}</p>
			<p>{phone}</p>
			<p>{email}</p>
			<p>{address}</p>
		</div>
	)
}

export default ContactCard
