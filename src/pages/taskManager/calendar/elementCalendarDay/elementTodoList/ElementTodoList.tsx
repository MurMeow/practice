import React from 'react'
import { useDispatch } from 'react-redux'
import './elementTodoList.scss'
import { Todo } from '../../../../../store/interface'
import { CHANGE_STATUS, REMOVE_TODO } from '../../../../../store/types'

export interface ElementTodoListProps {
	task: Todo
}

const ElementTodoList: React.FC<ElementTodoListProps> = ({ task }) => {
	const dispatch = useDispatch()

	const changeTaskStatus = () => {
		dispatch({
			type: CHANGE_STATUS,
			payload: {
				id: task.id,
			},
		})
	}

	const removeTask = () => {
		dispatch({
			type: REMOVE_TODO,
			payload: {
				id: task.id,
			},
		})
	}

	return (
		<div className='element-todo-list flex'>
			{task.isActiveStatus ? (
				<div className='element-todo-list__check-icon' onClick={changeTaskStatus}>
					<i className='material-icons unchecked'>radio_button_unchecked</i>
					<i className='material-icons checked'>check</i>
				</div>
			) : (
				<div className='element-todo-list__check-icon' onClick={changeTaskStatus}>
					<i className='material-icons'>check_circle</i>
				</div>
			)}
			<p>{task.todo}</p>
			<i className='material-icons element-todo-list__clear-icon' onClick={removeTask}>
				clear
			</i>
		</div>
	)
}

export default ElementTodoList
