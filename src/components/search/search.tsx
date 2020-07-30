import React from 'react'
import './search.scss'

export interface SearchProps {
	nameIcon: string
	placeholder: string
	returnSearchValue: (arg0: string) => void
}

const Search: React.FC<SearchProps> = ({
	nameIcon = 'search',
	placeholder = 'What are you looking for?',
	returnSearchValue,
}) => {
	const onChangeHandler = (event: any) => {
		returnSearchValue(event.target.value)
	}

	return (
		<div className='search'>
			<input
				className='search__input'
				type='text'
				placeholder={placeholder}
				onChange={onChangeHandler}
			/>
			<i className='search__icon material-icons'>{nameIcon}</i>
		</div>
	)
}

export default Search
