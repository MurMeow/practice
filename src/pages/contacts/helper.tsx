import moment from 'moment'
import { Contact } from '../../store/interface'


export const sortContactsByRequest = ( contacts:Contact[], enteredValueSearchContact:string ):Contact[] => {
	const regExp = new RegExp (`${enteredValueSearchContact}`, 'gim')
	return contacts.filter(item => Object.values(item).some(value => regExp.test(value) ))
}

export const sortContactsByNearestBirthday = (contacts:Contact[]):Contact[] => {
	return contacts.filter(item => {
		const months = moment().diff(item.birthday, 'months', false);
		const days = moment().diff(item.birthday, 'days', false);
		return (months%12 === 0 || months%12 === 11) && (days%365.25 >= 362 || Math.floor(days%365.25) <= 3)
	} )
}


