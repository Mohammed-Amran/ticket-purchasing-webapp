import apiClient from '../../../shared/services/apiClient'

export async function googleLoginApiRequest(idToken) {
  // Changed idToken to id_token to match the PHP backend expectation
  const response = await apiClient.post('/auth/google', {
    id_token: idToken,
  })
  return response.data
}