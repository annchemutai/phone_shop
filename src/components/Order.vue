<script setup>
import { useOrderStore } from '../stores/order'
import {onMounted} from 'vue'

const orderStore = useOrderStore()
const orders= orderStore.orders

onMounted(() => {
    orderStore.fetchOrdersByUser();
});

</script>


<template>
   
   <v-container>
        <v-row>
            <v-col v-for="order in orders" :key="order" cols="12" >
                <v-card color="lime" variant="elevated" class="mx-auto" >
                    <v-row>
                    <v-col md="4" align="center">
                        <v-img :src = "order.product.image" width="200px" height="300px"></v-img>
                    </v-col>
                    <v-col md="6">
                        <v-card-item>
                            <div>
                                <div class="text-overline mb-1"> {{order.product.name}} </div>
                                <div class="text-h6 mb-1"> {{order.product.price}} </div>
                                <div class="text-caption">{{ order.quantity }}</div>
                                <div class="text-caption">Total: {{ order.quantity * order.product.price }}</div>
                            </div>
                        </v-card-item>
                        <v-card-actions>
                            <v-btn> Checkout </v-btn>
                        </v-card-actions>
                    </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
   </v-container>
  
</template>