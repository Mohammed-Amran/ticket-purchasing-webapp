import { defineStore } from 'pinia';
import { loginRequest } from '../api/authApi';

export const useAuthStore = defineStore('auth', {

                                                 state: () => ({

                                                                user: null,

                                                                token: null,

                                                                loading: false,

                                                                error: null,

                                                               }),

                                                 actions: {

                                                           async login(email, password){

                                                                                        try{

                                                                                            this.loading = true;

                                                                                            this.error = null;

                                                                                            const response = await loginRequest(email, password);

                                                                                            this.user = response.user;

                                                                                            this.token = response.token;

                                                                                            localStorage.setItem('token', response.token);

                                                                                           }
                                                                                           catch (error){

                                                                                                         this.error = error.response?.data?.message || 'Login failed';

                                                                                                        }
                                                                                                        finally{

                                                                                                                this.loading = false;

                                                                                                               }

                                                                                       } // Closing brace of the 'login()' method.

                                                          }

                                                });