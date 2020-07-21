import React from 'react'
import './contactsTable.scss'

import {Contact} from '../../../store/interface'

interface ContactsTableProps {
	contacts: Contact[]
}

const ContactsTable: React.FC<ContactsTableProps> = ({contacts}) => {

	return (
		<div className='contacts-table'>

				<table summary="contacts">
					<thead>
					<tr>
						<th>name</th>
						<th>phone</th>
						<th>email</th>
						<th>address</th>
						<th>birthday</th>
					</tr>
					</thead>
					<tbody>
					{contacts.map((item,index) => {
						return (
							<tr key={index + item.name}>
								<td>{item.name}</td>
								<td>{item.phone}</td>
								<td>{item.email}</td>
								<td>{item.address}</td>
								<td>{item.birthday}</td>
							</tr>
						)
					})}
					</tbody>
				</table>

		</div>
	)
}

export default ContactsTable
