import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore('users',  {
   state: () => {
       const users = ref([])
       return{
           users,
       }
   },
   actions:{
       async fetchUsers() {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://127.0.0.1:8000/api/getAllUsers',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            this.users = response.data
        }
   },
   persist: true,
})
