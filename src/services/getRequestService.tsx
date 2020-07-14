import axios from 'axios'

const getRequestService = async (url: string) => {
	try {
		return await axios.get(url)
	}
	catch(error){
		console.log(error)
		throw error
	}
}

export default getRequestService
