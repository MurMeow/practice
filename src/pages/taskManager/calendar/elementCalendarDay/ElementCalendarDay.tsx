import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import './elementCalendarDay.scss'
import ElementTodoList from './elementTodoList/ElementTodoList'
import { Store, Todo } from '../../../../store/interface'

export interface ElementCalendarDayProps {
	date: string
}

const ElementCalendarDay: React.FC<ElementCalendarDayProps> = ({ date }) => {
	const { todoList } = useSelector((store: Store) => ({
		todoList: store.TodoList.todoList,
	}))

	const [tasksForToday, setTasksForToday] = useState<Todo[]>()

	useEffect(() => {
		setTasksForToday(todoList.filter((item) => item.date === date))
	}, [date, todoList])

	return (
		<div>
			{tasksForToday?.map((item) => {
				const externalId = uuidv4()
				return item.isActiveStatus && <ElementTodoList key={externalId} task={item} />
			})}
			{tasksForToday?.map((item) => {
				const externalId = uuidv4()
				return item.isActiveStatus === false && <ElementTodoList key={externalId} task={item} />
			})}
		</div>
	)
}

export default ElementCalendarDay
