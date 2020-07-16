import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './NavigationMenu.scss'
import FieldAdditionalFunctions from '../fieldAdditionalFunctions/FieldAdditionalFunctions'

const NavMenu: React.FC = () => {

	const [isOpenFieldAdditionalFunctions, setStateFieldAdditionalFunctions] = useState(false)

	const changeStateFieldAdditionalFunctions = () => {
		setStateFieldAdditionalFunctions(!isOpenFieldAdditionalFunctions)
	}

	return (
		<div className='app-container navMenu'>
			<header>
				<Link to={'/'}>
					<h2>manager</h2>
				</Link>
				<input className='switcher' type='checkbox' id='menu' />
				<label className='open' htmlFor='menu'>
					<i className='fa fa-bars' />
				</label>

				{/*<nav>*/}
				{/*	<div className='bg'>*/}
				{/*		<ul>*/}
				{/*			<li>*/}
				{/*				<Link to={'/'}>Home</Link>*/}
				{/*			</li>*/}
				{/*			<li>*/}
				{/*				<Link to={'/about_Me'}>About Me</Link>*/}
				{/*			</li>*/}
				{/*			<li>*/}
				{/*				<Link to={'/skills'}>Skills</Link>*/}
				{/*			</li>*/}
				{/*			<li>*/}
				{/*				<Link to={'/portfolio'}>Portfolio</Link>*/}
				{/*			</li>*/}
				{/*			<li>*/}
				{/*				<Link to={'/contacts'}>Contacts</Link>*/}
				{/*			</li>*/}
				{/*		</ul>*/}
				{/*		<label className='close' htmlFor='menu'>*/}
				{/*			<i className='fa fa-times' />*/}
				{/*		</label>*/}
				{/*	</div>*/}
				{/*</nav>*/}

				<FieldAdditionalFunctions isOpen={isOpenFieldAdditionalFunctions} changeState={changeStateFieldAdditionalFunctions}/>
			</header>
		</div>
	)
}

export default NavMenu
