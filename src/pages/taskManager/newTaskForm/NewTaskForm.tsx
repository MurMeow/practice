import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './newTaskForm.scss'
import { CREATE_NEW_TODO } from '../../../store/types'


export interface NewTaskFormProps {
	specialClass:string
}


const NewTaskForm: React.FC<NewTaskFormProps> = ({specialClass}) => {

	const [newTask, setNewTask] = useState<string>('')
	const [dateNewTask, setDateNewTask] = useState<string>('')

	const dispatch = useDispatch()

	const addNewTask = (newTask: string, dateNewTask: string) => {
		dispatch({
			type: CREATE_NEW_TODO,
			payload: {
				todo: newTask,
				date: dateNewTask,
				isActiveStatus: true,
				id: '10095'
			},
		})
		setNewTask('')
		setDateNewTask('')
	}

	useEffect(() => {
	}, [newTask, dateNewTask])

	return (
		<div className={`task-form ${specialClass}`}>
			<h5 className='task-form__title-form'>Form new task</h5>
			<form onKeyUp={(event) => event.keyCode === 13 && addNewTask(newTask,dateNewTask)}>
				<input type='text' placeholder='todo' onChange={event => setNewTask( event.target.value)} value={newTask}/>
				<div className='flex'>
					<input type='text' placeholder='YYYY-MM-DD' onChange={event => setDateNewTask(event.target.value)} value={dateNewTask}/>
					<input type='button' value='save' onClick={() => addNewTask(newTask,dateNewTask)}/>
					<i className='material-icons' onClick={() => addNewTask(newTask,dateNewTask)}>control_pointer</i>
				</div>
			</form>
		</div>
	)
}

export default NewTaskForm