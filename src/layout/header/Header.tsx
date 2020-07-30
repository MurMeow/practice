import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './header.scss'
import FieldAdditionalFunctions from './fieldAdditionalFunctions/FieldAdditionalFunctions'

const Header: React.FC = () => {
	const [isOpenFieldAdditionalFunctions, setStateFieldAdditionalFunctions] = useState(false)

	const changeStateFieldAdditionalFunctions = () => {
		setStateFieldAdditionalFunctions(!isOpenFieldAdditionalFunctions)
	}

	return (
		<div className='app-container navMenu'>
			<header>
				<FieldAdditionalFunctions
					isOpen={isOpenFieldAdditionalFunctions}
					changeState={changeStateFieldAdditionalFunctions}
				/>
				<div className='main-data flex'>
					<p>{moment().format('YYYY-MM-DD')}</p>
					<Link to={'/'}>
						<h2>personal manager</h2>
					</Link>
				</div>
				<input className='switcher' type='checkbox' id='menu' />
				<label className='open' htmlFor='menu'>
					<i className='fa fa-bars' />
				</label>
			</header>
		</div>
	)
}

export default Header
