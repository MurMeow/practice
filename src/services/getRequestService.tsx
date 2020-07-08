import axios from 'axios'

const getRequestService = async (url: string) => {
	const a = null
	const result = await axios
		.get(url)
		.then((res) => {
			return res
		})
		.catch((error) => {
			console.log(error)
			throw error
			return error
		})
	return result
}

export default getRequestService
