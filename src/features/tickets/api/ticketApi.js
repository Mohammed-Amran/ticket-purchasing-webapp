import apiClient from '../../../shared/services/apiClient'

export async function fetchMatchDetailsApiRequest(matchId) {
  const response = await apiClient.get(`/matches/${matchId}`)
  return response.data
}

export async function addToCartApiRequest(uid, ticketId) {
  const response = await apiClient.post('/cart', { uid, ticketId })
  return response.data
}

export async function checkoutApiRequest(uid, ticketId, email) {
  const response = await apiClient.post('/checkout', { uid, ticketId, email })
  return response.data
}