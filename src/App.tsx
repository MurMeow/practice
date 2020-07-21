import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import CommonLayout from './layout/CommonLayout'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'


const App: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<div className='App wrapper'>
				<Header />
				<CommonLayout />
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App
