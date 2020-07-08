import React from 'react'
import './navigationCard.scss'
import { Link } from 'react-router-dom'

interface NavigationCardProps {
	title: string
	text: string[]
	link: string
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title = '', text = [''], link = '' }) => {
	console.log(typeof text)
	return (
		<div className='box navigationCard'>
			<h5>{title}</h5>
			{text !== [''] &&
				text.map((item, index) => {
					return <p key={index}>{item}</p>
				})}
			<p className='details'>
				<Link to={link}>Details</Link>
			</p>
		</div>
	)
}

export default NavigationCard
