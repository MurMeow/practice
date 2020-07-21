import { CREATE_NEW_CONTACT, REMOVE_CONTACT } from '../types'
import { ContactState } from '../interface'
import defaultContacts from '../../consts/contacts.json'

const initialState:ContactState= {
	contacts: defaultContacts
}

export function Contacts(state = initialState, action: any) {
	switch (action.type) {
		case CREATE_NEW_CONTACT: {
			const newState: ContactState = {
				...state,
				contacts: [...state.contacts, action.payload],
			}
			return newState
		}

		case REMOVE_CONTACT: {
			const newState: ContactState = {
				...state,
				contacts: action.payload,
			}
			return newState
		}

		default: {
			return state
		}
	}
}
