import React from 'react'
import './search.scss'

export interface searchProps {
	nameIcon: string
	placeholder: string
	returnSearchValue: (arg0:string) => void
}

const Search: React.FC<searchProps> = ({ nameIcon = 'search', placeholder = 'What are you looking for?', returnSearchValue }) => {

	return (
		<div className='search'>
			<input className='search__input' type='text' placeholder={placeholder} onChange={event => returnSearchValue(event.target.value)}/>
			<i className='search__icon material-icons'>{nameIcon}</i>
		</div>
	)
}

export default Search
