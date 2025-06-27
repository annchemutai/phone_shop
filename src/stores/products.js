import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useProductsStore = defineStore('products',  {
   state: () => {
       const products = ref([
           {
               id: 1,
               name: "Samsung Galaxy A16",
               price: "26,500",
               short_description: "Add Your Description",
               long_description: "Add Long Your Description",
               quantity: "12",
               image: "/images/products/A16.jpeg",
               brand:"Samsung",
               rating: 4.5
           },
           {
               id: 2,
               name: "Samsung Galaxy S25",
               price: "83,000",
               short_description: "Add Your Description",
               long_description: "Add Long Your Description",
               quantity: "5",
               image: "/images/products/s25.jpeg",
               brand: "Samsung",
               rating: 5

           }
       ])
       const selectedProduct = ref(0)


       return{
           products,
           selectedProduct
       }
   },
   actions:{
       updateSelectedProduct (payload) {
           this.selectedProduct = payload
       }
   },
   persist: true,
})
