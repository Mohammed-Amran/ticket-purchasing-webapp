import { defineStore } from 'pinia'
import { fetchMatchDetailsApiRequest, addToCartApiRequest, checkoutApiRequest } from '../api/ticketApi'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    currentMatch: null,
    availableTickets: [],
    loading: false,
    error: null,
    checkoutSuccess: false
  }),
  actions: {
    async fetchMatchDetails(matchId) {
      this.loading = true
      this.error = null
      try {
        const data = await fetchMatchDetailsApiRequest(matchId)
        this.currentMatch = data.match
        this.availableTickets = data.tickets
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to load ticket details'
      } finally {
        this.loading = false
      }
    },
    async addToCart(uid, ticketId) {
      try {
        await addToCartApiRequest(uid, ticketId)
        alert('Ticket added to cart!')
      } catch (error) {
        alert(error.response?.data?.error || 'Could not add to cart')
      }
    },
    async processCheckout(uid, ticketId, email) {
      this.loading = true
      try {
        await checkoutApiRequest(uid, ticketId, email)
        this.checkoutSuccess = true
        return true
      } catch (error) {
        this.error = error.response?.data?.error || 'Checkout failed'
        return false
      } finally {
        this.loading = false
      }
    }
  }
})