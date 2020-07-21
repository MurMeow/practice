import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
import CurrencyDetails from './pages/currencyDetails/CurrencyDetails'
import Contacts from './pages/contacts/Contacts'
import TaskManager from './pages/taskManager/TaskManager'

function Router() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={ Home } />
				<Route exact path='/currencyDetails' component={ CurrencyDetails } />
				<Route exact path='/contactsDetails' component={ Contacts } />
				<Route exact path='/todoList' component={ TaskManager } />
			</Switch>
		</>
	)
}

export default Router
