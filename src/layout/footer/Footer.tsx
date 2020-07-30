import React from 'react'
// import { Link } from 'react-router-dom'
import './footer.scss'
import NewTaskForm from '../../pages/taskManager/newTaskForm/NewTaskForm'
import ContactCreatorReduced from '../../pages/contacts/contactCreator/contactCreatorReduced/ContactCreatorReduced'

const Footer: React.FC = () => {
	return (
		<footer className='app-container flex footer'>
			<div className='tasks-creator flex'>
				<input className='switcher-tasks-creator' type='checkbox' id='tasksCreator' />
				<NewTaskForm specialClass='compressed' />
				<label className='label-for-open-tasks-creator flex' htmlFor='tasksCreator'>
					<p>Create new task</p>
					<i className='material-icons'>control_pointer</i>
				</label>
				<label className='label-for-close-tasks-creator' htmlFor='tasksCreator'>
					<i className='material-icons element-todo-list__clear-icon'>clear</i>
				</label>
			</div>

			<div className='contact-creator flex'>
				<input className='switcher-contact-creator' type='checkbox' id='contactCreator' />
				<ContactCreatorReduced />
				<label className='label-for-open-contact-creator flex' htmlFor='contactCreator'>
					<p>Create new contact</p>
					<i className='material-icons'>control_pointer</i>
				</label>
				<label className='label-for-close-contact-creator' htmlFor='contactCreator'>
					<i className='material-icons element-todo-list__clear-icon'>clear</i>
				</label>
			</div>
		</footer>
	)
}

export default Footer
