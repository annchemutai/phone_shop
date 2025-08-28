<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios';
import { useProductsStore } from '../stores/products'
import { useOrderStore } from '../stores/order'
import { useUserStore } from '../stores/users'

const productsStore = useProductsStore()
const products= productsStore.products
const orderStore = useOrderStore()
const orders= orderStore.orders
const userStore = useUserStore()
const users= userStore.users
const error = ref('')
const loading = ref(false)
const token = localStorage.getItem('authToken');

const showAddUserDialog = ref(false)
const showEditUserDialog = ref(false)
const showAddProductDialog = ref(false)
const showEditProductDialog = ref(false)

onMounted(() => {
   productsStore.fetchProducts();
   orderStore.fetchOrdersByUser();
   userStore.fetchUsers();
});

// Manage Users
// v-models
const username = ref('')
const email = ref('')
const phone = ref('')
const delivery_address = ref('')
const password = ref('')
const role_id = ref('')
const roles = ref([
   { id: 1, name: 'Admin'},
   { id: 2, name: 'Customer'}
])

//Add
async function saveUser(){
   const formData = new FormData()
   formData.append('name', username.value)
   formData.append('email', email.value)
   formData.append('phone', phone.value)
   formData.append('delivery_address', delivery_address.value)
   formData.append('password', password.value)
   formData.append('role_id', role_id.value)

   console.log(role_id)
   try {
      await axios.post('http://127.0.0.1:8000/api/createUser', formData,
         { headers: { 'Authorization': `Bearer ${token}` } })
   } catch (err) {
      error.value = err.response?.data?.message || 'Creating user failed'
      throw err
   } finally {
      loading.value = false
      showAddUserDialog.value = false
      username.value = ''
      email.value = ''
      phone.value = ''
      delivery_address.value = ''
      password.value = ''
      role_id.value = ''
   }
}

async function editUser(user_id){
   const formData = new FormData()
   formData.append('name', username)
   formData.append('email', email)
   formData.append('phone', phone)
   formData.append('delivery_address', delivery_address)
   formData.append('password', password)
   formData.append('role_id', role_id)
   try {
      await axios.post('http://127.0.0.1:8000/api/updateUser/'+ user_id, formData,
         {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
   } catch (err) {
      error.value = err.response?.data?.message || 'Editing user failed'
      throw err
   } finally {
      loading.value = false
      username.value = ''
      email.value = ''
      phone.value = ''
      delivery_address.value = ''
      password.value = ''
      role_id.value = ''
   }
}
async function deleteUser(user_id){
   try {
      await axios.post('http://127.0.0.1:8000/api/deleteUser/'+ user_id,
         {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
   } catch (err) {
      error.value = err.response?.data?.message || 'Deleting user failed'
      throw err
   } finally {
      loading.value = false
   }
}


//Edit
//Delete
</script>

<template>
   <v-container>
      <!-- Users -->
      <v-expansion-panels>
         <v-expansion-panel title="Users" color="lime">
            <v-expansion-panel-text>
               <v-container>
                  <v-btn @click="showAddUserDialog = true"> Add User </v-btn>
                  <v-row>
                        <v-col v-for="item in users" :key="item" cols="12" >
                           <v-card color="lime" variant="elevated" class="mx-auto" >
                              <v-row>
                              <v-col md="4" align="center">
                                    <v-img :src = "item.image" width="200px" height="300px"></v-img>
                              </v-col>
                              <v-col md="6">
                                    <v-card-item>
                                       <div>
                                          <div class="text-overline mb-1"> {{item.name}} </div>
                                          <div class="text-h6 mb-1"> {{item.role_id ==1 ? 'Admin' : 'Customer'}} </div>
                                          <div class="text-caption">{{ item.phone }}</div>
                                          <div class="text-caption">{{ item.delivery_address }}</div>
                                       </div>
                                    </v-card-item>
                                    <v-card-actions>
                                       <v-btn> Edit User </v-btn>
                                    </v-card-actions>
                              </v-col>
                              </v-row>
                           </v-card>
                        </v-col>
                  </v-row>
               </v-container>
            </v-expansion-panel-text>
         </v-expansion-panel>
         <!-- Products -->
         <v-expansion-panel title="Products" color="lime">
            <v-expansion-panel-text>
               <v-container>
                  <v-row>
                        <v-col v-for="item in products" :key="item" cols="12" >
                           <v-card color="lime" variant="elevated" class="mx-auto" >
                              <v-row>
                              <v-col md="4" align="center">
                                    <v-img :src = "item.image" width="200px" height="300px"></v-img>
                              </v-col>
                              <v-col md="6">
                                    <v-card-item>
                                       <div>
                                          <div class="text-overline mb-1"> {{item.name}} </div>
                                          <div class="text-h6 mb-1"> {{item.price}} </div>
                                          <div class="text-caption">{{ item.quantity }}</div>
                                       </div>
                                    </v-card-item>
                                    <v-card-actions>
                                       <v-btn> Edit Product </v-btn>
                                    </v-card-actions>
                              </v-col>
                              </v-row>
                           </v-card>
                        </v-col>
                  </v-row>
               </v-container>
            </v-expansion-panel-text>
         </v-expansion-panel>
         <!-- Orders -->
         <v-expansion-panel title="Orders" color="lime">
            <v-expansion-panel-text>
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
                                       <v-btn> Edit Order </v-btn>
                                    </v-card-actions>
                              </v-col>
                              </v-row>
                           </v-card>
                        </v-col>
                  </v-row>
               </v-container>
            </v-expansion-panel-text>
         </v-expansion-panel>
      </v-expansion-panels>
      <!-- Dialogs -->
       <!-- User Dialogs -->
      <v-dialog v-model="showAddUserDialog" max-width="600" >

      <v-card prepend-icon="mdi-account" title="New User" >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6" >
              <v-text-field v-model="username" label="First name" required ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6" >
              <v-text-field v-model="email" label="Email" ></v-text-field> </v-col>

            <v-col cols="12" md="4" sm="6" >
              <v-text-field v-model="phone" label="Phone" required ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6" >
              <v-text-field v-model="delivery_address" label="Delivery Address" required ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6" >
              <v-text-field v-model="password" label="Password" type="password" required ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6" >
              <v-select v-model="role_id" :items="roles" item-title="name" item-value="id" label="Role" required ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
         <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="showAddUserDialog = false" ></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="saveUser()" ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   </v-container>
</template>