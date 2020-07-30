import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import './contactsTable.scss'
import { Contact } from '../../../store/interface'

interface ContactsTableProps {
	contacts: Contact[]
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts }) => {
	return (
		<div className='contacts-table'>
			<table summary='contacts'>
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
					{contacts.map((item) => {
						const externalId = uuidv4()
						return (
							<tr key={externalId}>
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
