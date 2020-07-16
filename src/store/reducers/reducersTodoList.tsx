import { CREATE_NEW_TODO, REMOVE_TODO, CHANGE_STATUS } from '../types'
import { TodoListState } from '../interface'
import defaultTodoListFromConst from '../../consts/todoList.json'


// const defaultTodoList = (defaultTodoListFromConst: object[]): Todo[] => {
// 	return defaultTodoListFromConst.map(item => {return ({	todo: item.todo,
// 		date: item.date,
// 		isActiveStatus: item.isActiveStatus,
// 		id: item.id,})} )
// }

const initialState:TodoListState= {
	todoList: defaultTodoListFromConst
}

export function TodoList(state = initialState, action: any) {
	switch (action.type) {
		case CREATE_NEW_TODO: {
			const newState: TodoListState = {
				...state,
				todoList: [...state.todoList, action.payload],
			}
			return newState
		}

		case REMOVE_TODO: {
			const newState: TodoListState = {
				...state,
				todoList: state.todoList.filter(item => item.id !== action.payload.id )
			}
			return newState
		}

		case CHANGE_STATUS: {
			const newState: TodoListState = {
				...state,
				todoList: state.todoList.map(item => {
						if(item.id===action.payload.id){
							item.isActiveStatus = !item.isActiveStatus
						}
						return item
				} )

			}
			return newState
		}

		default: {
			return state
		}
	}
}
