import React from 'react'
import './todoList.scss'
import NewTaskForm from './newTaskForm/NewTaskForm'
import Calendar from './calendar/Calendar'


const TodoList: React.FC = () => {

	return (
		<div className='todo-list app-container'>
			<h4>TodoList</h4>
			<NewTaskForm/>
			<Calendar/>
		</div>
	)
}

export default TodoList