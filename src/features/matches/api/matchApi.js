import apiClient from '../../../shared/services/apiClient'

export async function fetchMatchesApiRequest() {

  const response = await apiClient.get('/matches')
  return response.data;
  
}