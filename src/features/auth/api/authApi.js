import apiClient from '../../../shared/services/apiClient'

export async function loginRequest(email, password) {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  })

  return response.data
} // Closing brace of the 'loginRequest()' method.
