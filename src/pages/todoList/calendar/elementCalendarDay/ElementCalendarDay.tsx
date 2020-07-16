import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './elementCalendarDay.scss'
import ElementTodoList from './elementTodoList/ElementTodoList'
import { Store, Todo } from '../../../../store/interface'


export interface ElementCalendarDayProps {
	date: string
}

const ElementCalendarDay: React.FC<ElementCalendarDayProps> = ({date}) => {

	const { todoList } = useSelector((store: Store) => ({
		todoList: store.TodoList.todoList,
	}))

	const [tasksForToday, setTasksForToday] = useState<Todo[]>()

	useEffect(() => {
		setTasksForToday(todoList.filter(item => item.date === date))
	}, [date, todoList])

	return (
		<div className='box calendar-day'>
			{
				tasksForToday?.map( (item, index) => {
					 return <ElementTodoList key={index} task={item}/>
				})
			}

		</div>
	)
}

export default ElementCalendarDay