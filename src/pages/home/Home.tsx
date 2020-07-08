import React, { useState } from 'react'
import './Home.scss'
import CurrenciesBlock from '../../components/currency/currency'
import FieldAdditionalFunctions from '../../components/fieldAdditionalFunctions/FieldAdditionalFunctions'

const Home: React.FC = () => {
	const [isOpenFieldAdditionalFunctions, setStateFieldAdditionalFunctions] = useState(false)

	const changeStateFieldAdditionalFunctions = () => {
		setStateFieldAdditionalFunctions(!isOpenFieldAdditionalFunctions)
	}

	return (
		<div>
			<FieldAdditionalFunctions isOpen={isOpenFieldAdditionalFunctions} changeState={changeStateFieldAdditionalFunctions}/>
			<CurrenciesBlock />
		</div>
	)
}

export default Home
