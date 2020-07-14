import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { CurrencyRequest } from './reducers/reducersCurrency'
import { GeneralState } from './reducers/reducersGeneralState'
import { Contacts } from './reducers/reducersContacts'

const reducers = combineReducers({
	CurrencyRequest,
	GeneralState,
	Contacts
})

const composeEnhancers = composeWithDevTools({})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
