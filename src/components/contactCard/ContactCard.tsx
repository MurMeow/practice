import React from 'react'
import './contactCard.scss'

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
			<i className="material-icons">cake</i>
			<div className={`photo ${name}`}></div>
			<h4>{name}</h4>
			<p>{phone}</p>
			<p>{email}</p>
			<p>{birthday}</p>
			<p>{address}</p>
		</div>
	)
}

export default ContactCard
