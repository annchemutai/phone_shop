import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useOrderStore = defineStore('orders',  {
   state: () => {
       const orders = ref([])

       return{
           orders,
       }
   },
   actions:{
       async fetchOrdersByUser() {
            const token = localStorage.getItem('authToken');
            const user_id = JSON.parse(localStorage.getItem("user"))._value.id
            const response = await axios.get('http://127.0.0.1:8000/api/ordersByUser/' + user_id,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                this.orders = response.data
        } 
   },
   persist: true,
})
