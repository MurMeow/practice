import React from 'react'
import NavMenu from './components/NavMenu/NavigationMenu'
import CommonLayout from './layout/CommonLayout'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const App: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<div className='App'>
				<NavMenu />
				<CommonLayout />
			</div>
		</BrowserRouter>
	)
}

export default App
