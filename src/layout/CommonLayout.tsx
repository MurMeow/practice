import React from 'react'
import Routers from '../routers'
import './commonLayout.scss'
import ErrorBlock from '../components/error/ErrorBlock'

const CommonLayout: React.FC = () => {
	return (
		<main className='content'>
			<ErrorBlock />
			<Routers />
		</main>
	)
}

export default CommonLayout
