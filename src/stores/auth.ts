import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  const isLoggedIn = ref(false);

  const setLoggedIn  = (status:boolean)=>{
    isLoggedIn.value = status;
  }

  return {isLoggedIn, setLoggedIn }
})