import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
import CurrencyDetails from './pages/currencyDetails/CurrencyDetails'
import Contacts from './pages/contacts/Contacts'

function Router() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/currencyDetails' component={CurrencyDetails} />
				<Route exact path='/contactsDetails' component={Contacts} />
			</Switch>
		</>
	)
}

export default Router
