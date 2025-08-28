<script setup>
import { useProductsStore } from '../stores/products'
import {ref} from 'vue'
import axios from 'axios';
import {useRouter} from "vue-router";

const router = useRouter();
const productsStore = useProductsStore()
const products= productsStore.products
const selectedProduct = products.find(product => product.id == productsStore.selectedProduct);
const loading = ref(false)
const error = ref('')
const message = ref('')
const snackbar = ref(false)

let quantity = ref(1)
function increment(){
   quantity.value++
}
function decrement(){
   if (quantity.value >0){
       quantity.value--
   }
}

async function buy(product){
    loading.value = true
    const user_id = JSON.parse(localStorage.getItem("user"))._value.id

    //check if user is logged in
    if (!user_id){
        router.push('/login')
    }else{
        const data = ref({
            user_id : user_id,
            product_id : product,
            quantity: quantity,
            payment_status: 'paid',
            payment_method: 'Mpesa' //To do implement MPesa payment
        })
        try{
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://127.0.0.1:8000/api/createOrder', data.value,        
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            message.value = 'Order made succefully and is being processed'
        } catch (err) {
            error.value = err.response?.data?.message || 'Order process failed'
            throw err
        } finally {
            loading.value = false
            router.push('/order')
        }
    }
}
</script>


<template>
  <v-container>
   <v-row>
       <v-col md="6">
           <v-card>
               <v-img class="align-end text-white" height="500" :src="selectedProduct.image" cover ></v-img>
           </v-card>
       </v-col>
       <v-col md="6">
           <v-card>
               <v-card-item>
                   <v-card-title>{{selectedProduct.name}}</v-card-title>
                   <v-chip> {{ selectedProduct.brand }} </v-chip>
                       <v-row>
                           <v-col md="4">
                               <v-rating :model-value="selectedProduct.rating" :size="24" readonly ></v-rating>
                           </v-col>
                           <v-col md="6">
                               <v-btn color="lime-lighten-2" variant="outlined" density="compact" readonly> In Stock</v-btn>
                           </v-col>
                       </v-row>
                   <v-card-text> {{selectedProduct.long_description}} </v-card-text>
                   <v-card-title>{{selectedProduct.price}}</v-card-title>
               </v-card-item>
               <v-card-actions>
                   <div>
                       <v-btn @click="decrement()" variant="outlined" color="lime-lighten-2">-</v-btn>
                       <span> {{ quantity }} </span>
                       <v-btn @click="increment()" variant="outlined" color="lime-lighten-2">+</v-btn>
                   </div>
                   <v-btn elevation="4" color="lime" variant="tonal" @click="buy(selectedProduct.id)" > Buy </v-btn>
               </v-card-actions>
           </v-card>
       </v-col>
   </v-row>
  </v-container>
  <v-snackbar
      v-model="snackbar"
    >
      {{ message }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false" > Close </v-btn>
      </template>
    </v-snackbar>
</template>