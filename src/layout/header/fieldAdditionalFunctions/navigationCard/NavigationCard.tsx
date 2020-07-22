import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import './navigationCard.scss'


interface NavigationCardProps {
	title: string
	text: string[]
	link: string
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title = '', text = [''], link = '' }) => {
	return (
		<div className='box navigationCard'>
			<h5>{title}</h5>
			{text !== [''] &&
				text.map((item) => {
					return <p key={uuidv4()}>{item}</p>
				})}
			<p className='details'>
				<Link to={link}>Details</Link>
			</p>
		</div>
	)
}

export default NavigationCard
