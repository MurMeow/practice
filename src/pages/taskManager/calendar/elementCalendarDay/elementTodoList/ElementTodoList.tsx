import React from 'react'
import { useDispatch } from 'react-redux'
import './elementTodoList.scss'
import { Todo } from '../../../../../store/interface'
import { CHANGE_STATUS, REMOVE_TODO } from '../../../../../store/types'


export interface ElementTodoListProps {
	task: Todo
}


const ElementTodoList: React.FC<ElementTodoListProps> = ({task}) => {

	const dispatch = useDispatch()

	const changeTaskStatus = (id: string) => {
		dispatch({
			type: CHANGE_STATUS,
			payload: {
				id: id
			},
		})
	}

	const removeTask = (id: string) => {
		dispatch({
			type: REMOVE_TODO,
			payload: {
				id: id
			},
		})
	}

	return (
		<div className='element-todo-list flex'>

			{task.isActiveStatus ?
				<div className='element-todo-list__check-icon'
						 onClick={() => changeTaskStatus(task.id)}>
					<i className='material-icons unchecked'>radio_button_unchecked</i>
					<i className='material-icons checked'>check</i>
				</div>
				:
				<div className='element-todo-list__check-icon'
						 onClick={() => changeTaskStatus(task.id)}>
					<i className='material-icons'>check_circle</i>
				</div>
			}
			<p>{task.todo}</p>
			<i className='material-icons element-todo-list__clear-icon'
				 onClick={() => removeTask(task.id)}>clear</i>

		</div>
	)
}

export default ElementTodoList