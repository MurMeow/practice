import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import './todoList.scss'
import ElementTodoList from '../calendar/elementCalendarDay/elementTodoList/ElementTodoList'

import { Store, Todo } from '../../../store/interface'

export interface TodoListProps {
	specialProps?: string
}

const TodoList: React.FC<TodoListProps> = ({ specialProps }) => {
	const { todoList } = useSelector((store: Store) => ({
		todoList: store.TodoList.todoList,
	}))

	return (
		<div className='todo-list- '>
			{specialProps === 'completed' &&
				todoList.map((item) => {
					const externalId = uuidv4()
					return item.isActiveStatus === false && <ElementTodoList key={externalId} task={item} />
				})}
			{specialProps === 'ahead' &&
				todoList.map((item) => {
					const externalId = uuidv4()
					return item.isActiveStatus && <ElementTodoList key={externalId} task={item} />
				})}
		</div>
	)
}

export default TodoList
