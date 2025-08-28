<template>
   <v-app-bar color = "lime">
       <v-app-bar-title>The Phone Shop</v-app-bar-title>
       <v-btn to="/"> Home</v-btn>
       <v-btn to="/products"> Products</v-btn>
       <div v-if="isAdmin">
            <v-btn to="/admin"> Admin</v-btn>
         </div>
        <div v-if="!authenticated">
            <v-btn to="/login"> Login</v-btn>
         </div>
         <div v-else>
            <v-btn to="/profile"> Profile</v-btn>
         </div>
   </v-app-bar>
</template>

<script setup>

const authenticated = localStorage.getItem("authToken");
const isAdmin = localStorage.getItem("isAdmin");

</script>