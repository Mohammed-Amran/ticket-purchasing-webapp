import { defineStore } from 'pinia';
import { fetchMatchesApiRequest } from '../api/matchApi';

export const useMatchStore = defineStore('match', {
  state: () => ({
    matches: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMatches() {
      this.loading = true;
      this.error = null;
      try {
        this.matches = await fetchMatchesApiRequest();
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch matches';
      } finally {
        this.loading = false;
      }
    }
  }
});