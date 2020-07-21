import React from 'react'
import './taskManager.scss'
import NewTaskForm from '../taskManager/newTaskForm/NewTaskForm'
import Calendar from '../taskManager/calendar/Calendar'
import TodoList from './todoList/TodoList'


const TaskManager: React.FC = () => {
	return (
		<div className='todo-list-calendar'>
			<div className='app-container'>
				<h4>Calendar</h4>
				<Calendar/>
			</div>

			<div className='app-container flex todo-list-container'>
				<NewTaskForm specialClass='expanded'/>
				<div>
					<h5>Tasks ahead</h5>
					<TodoList specialProps='ahead'/>
				</div>
				<div>
					<h5>Completed tasks</h5>
					<TodoList specialProps='completed'/>
				</div>
			</div>
		</div>
	)
}

export default TaskManager