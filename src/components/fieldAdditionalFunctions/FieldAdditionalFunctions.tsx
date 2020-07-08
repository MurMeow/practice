import React from 'react'
import './fieldAdditionalFunctions.scss'
import NavigationCard from '../app/navigationCard/NavigationCard'
import { Link } from 'react-router-dom'

interface FieldAdditionalFunctionsProps {
	isOpen: boolean
	changeState: () => void
}

const FieldAdditionalFunctions: React.FC<FieldAdditionalFunctionsProps> = ({ isOpen = false, changeState }) => {
	return (
		<div className='fieldAdditionalFunctions container-block'>
			{isOpen ? (
				<div className='flex'>
					<i className='material-icons up' onClick={changeState}>double_arrow</i>
					<div className='flex boxAdditionalFunctions'>
						<NavigationCard
							title='Currency'
							link='/currencyDetails'
							text={['str1', 'str2', 'str3']}
						/>
						<NavigationCard
							title='Contacts'
							link='/currencyDetails'
							text={['str4', 'str5', 'str6']}
						/>
						<NavigationCard
							title='To do list'
							link='/currencyDetails'
							text={['str7', 'str8', 'str9']}
						/>
					</div>
				</div>
			) : (
				<div className='flex'>
					<i className='material-icons down' onClick={changeState}>double_arrow</i>
					<div className='flex boxAdditionalFunctions'>
						<p>
							<Link to='/currencyDetails'>Currency</Link>
						</p>
						<p>
							<Link to='/currencyDetails'>Contacts</Link>
						</p>
						<p>
							<Link to='/currencyDetails'>To do list</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default FieldAdditionalFunctions
