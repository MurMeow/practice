import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './contacts.scss'
import { sortContactsByRequest, sortContactsByNearestBirthday } from './helper'
import { Contact, Store } from '../../store/interface'
import Search from '../../components/search/search'
import ContactsTable from './contactsTable/ContactsTable'
import ContactCard from './contactCard/ContactCard'
import ContactCreatorDeployed from './contactCreator/contactCreatorDeployed/ContactCreatorDeployed'


const Contacts: React.FC = () => {

	const { contacts } = useSelector((store: Store) => ({
		contacts: store.Contacts.contacts,
	}))

	const [enteredValueSearchContact, setSearchValue] = useState<string>('')
	const [contactsMatchingSearch, setContactsMatchingSearch] = useState<Contact[] | []>(contacts)
	const [isError, setErrorState] = useState<boolean>(false)
	const [cardsDisplayElement, setCardsDisplayElement] = useState()


	useEffect(() => {
		const sortedContactsMatchingSearch = sortContactsByRequest(contacts, enteredValueSearchContact)
		setContactsMatchingSearch(sortedContactsMatchingSearch)

		sortedContactsMatchingSearch.length === 0 ? setErrorState(true) : setErrorState(false)

		const peopleWhoHaveBirthdaySoon = sortContactsByNearestBirthday(contacts)
		setCardsDisplayElement(peopleWhoHaveBirthdaySoon.map( (item, index) => {
			return (
				<ContactCard key={index}
										 name={item.name}
										 phone={item.phone}
										 address={item.address}
										 birthday={item.birthday}
										 email={item.email}/>
			)
		}))
	}, [enteredValueSearchContact, contacts])

	return (
		<div className='contacts flex'>

			<div className='app-container contacts--contacts-box '>
				<div className='flex contacts-box__search'>
					<h4>Contacts</h4>
					<Search nameIcon='person_search' placeholder='Who are you looking for?' returnSearchValue={setSearchValue} />
				</div>
				<ContactsTable contacts={contactsMatchingSearch}/>
				{isError && <div>Error: Your search returned no results.</div>}
			</div>

			<div className=' contacts--birthdays-box '>
				<div className='app-container'>
					<ContactCreatorDeployed />
				</div>
				<div className='app-container'><h4>Birthdays</h4>
					<div className='flex birthdays'>
						{cardsDisplayElement}
					</div>
				</div>
			</div>

		</div>
	)
}

export default Contacts
