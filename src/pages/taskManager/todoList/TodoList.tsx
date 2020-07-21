import React from 'react'
import './todoList.scss'
import ElementTodoList from '../calendar/elementCalendarDay/elementTodoList/ElementTodoList'
import {useSelector} from 'react-redux'
import {Store, Todo} from '../../../store/interface'

export interface TodoListProps {
	specialProps?: string
}

const TodoList: React.FC<TodoListProps> = ({specialProps}) => {

	const { todoList } = useSelector((store: Store) => ({
		todoList: store.TodoList.todoList,
	}))

	return (
		<div className='todo-list- '>
			{
				specialProps==='completed' && todoList.map( (item, index)  => {
				return item.isActiveStatus===false && <ElementTodoList  key = {index} task ={item}/>
			})}
			{specialProps==='ahead' && todoList.map( (item, index)  => {
				return item.isActiveStatus && <ElementTodoList  key = {index} task ={item}/>
			})}
		</div>
	)
}

export default TodoList