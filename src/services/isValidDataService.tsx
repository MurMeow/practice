import moment from 'moment'

const isValidName = (name: string) => {
	return name === '' ? 'Iмя не может быть пустым' : ''
}

const isValidPhone = (phone: string | undefined) => {
	// const regExpPhone2 = /^[+]?[\({1}\d{1,3}\){1}]?[\d\(\)\ ]{4,14}\d$/
	const regExpPhone = /^(\+)?(\(\d{2,5}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,10}\) ?)){5,20}[\d | ]$/
	return phone && phone !== '' && !regExpPhone.test(phone)
		? 'Номер телефона введен неправильно!'
		: ''
}

const isValidEmail = (email: string | undefined) => {
	const regExpEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
	return email && email !== '' && !regExpEmail.test(email) ? 'email введен неправильно!' : ''
}

const isValidDate = (birthday: string | undefined) => {
	const isValidDate = moment(birthday).isValid()
	// console.log("isValidDate",moment(birthday).format("DD-MM-YYYY"),isValidDate)
	// const regExpDate2 = /^\d[\d\(\)\ -]{4,14}\d$/
	// const regExpDate = /^\d[\d\(\)\ -]{4,14}\d$/
	return birthday && birthday !== '' && !isValidDate ? 'Дата введена неправильно!' : ''
}

export default {
	isValidName,
	isValidPhone,
	isValidEmail,
	isValidDate,
}
