import React from 'react'
import Routers from '../routers'
import './CommonLayout.scss'
import ErrorBlock from '../components/app/error/ErrorBlock'

const CommonLayout: React.FC = () => {
	return (
		<main>
			<ErrorBlock />
			<Routers />
		</main>
	)
}

export default CommonLayout
