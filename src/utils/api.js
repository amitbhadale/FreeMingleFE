import axios from 'axios'
// import { useToast } from 'vue-toastification';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL + '/api',
  withCredentials: true,
  // headers: { 'Content-Type': 'application/json' },
})

// Attach token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  // if (token) config.headers.Authorization = `Bearer ${token}`
  if (token) config.headers.Authorization = `${token}`
  return config
})

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // toast.error(error.response?.data?.error || 'An error occurred');
    console.log('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

const handleRequest = async (method, url, data = null, params = null) => {
  try {
    const isFormData = data instanceof FormData

    const response = await apiClient({
      method,
      url,
      data,
      params,
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    })

    return response.data
  } catch (error) {
    console.error(`API Error (${method.toUpperCase()} ${url}):`, error)
    throw error.response?.data || { message: 'Network error' }
  }
}

export const get = (url, params) => handleRequest('get', url, null, params)
export const post = (url, data) => handleRequest('post', url, data)
export const put = (url, data) => handleRequest('put', url, data)
export const del = (url, data) => handleRequest('delete', url, data)

export default { get, post, put, del }
