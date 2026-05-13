import { defineStore } from 'pinia';

import { googleLoginApiRequest } from '../api/authApi';

export const useAuthStore = defineStore('auth', {

                                                 state: () => ({

                                                                user: null,

                                                                token: null,

                                                                loading: false,

                                                                error: null,

                                                               }),

                                                 actions: {

                                                           async loginWithGoogle(googleIdToken){

                                                                                                this.loading = true;

                                                                                                this.error = null;

                                                                                                try{                                                                                            

                                                                                                    const response = await googleLoginApiRequest(googleIdToken);
        
                                                                                                    this.user = response.user;
        
                                                                                                    this.token = googleIdToken;
        
                                                                                                    localStorage.setItem('user', JSON.stringify(response.user));

                                                                                                    return true;

                                                                                                }
                                                                                                catch (error){
     
                                                                                                              this.error = error.response?.data?.error || 'Google Login failed on Backend';

                                                                                                              console.error('Backend Google login error', error)

                                                                                                              return false;
                                                                                                             }
                                                                                                             finally{

                                                                                                                     this.loading = false;

                                                                                                                    }

                                                                                       } // Closing brace of the 'login()' method.

                                                          }

                                                });