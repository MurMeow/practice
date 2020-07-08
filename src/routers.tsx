import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
import CurrencyDetails from './pages/currencyDetails/CurrencyDetails'

function Router() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/currencyDetails' component={CurrencyDetails} />
			</Switch>
		</>
	)
}

export default Router
