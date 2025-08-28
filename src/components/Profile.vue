<script setup>


</script>


<template>
   <v-container fluid>
          <v-card max-width="450px" class="mx-auto bg" elevation="2">
            <v-img class="" height="200px" src="http://unblast.com/wp-content/uploads/2021/09/Real-Estate-Agent-Illustration.jpg" gradient="150deg, rgb(185 224 255 / 58%) 0%, rgb(243 220 246 / 52%) 35%, rgb(223 255 242 / 74%) 74%">
            </v-img>
            <v-row justify="center">
              <v-col align-self="start" class="d-flex justify-center align-center pa-0" cols="12">
                <v-avatar class="profile avatar-center-heigth avatar-shadow" color="grey" size="164"> </v-avatar>
              </v-col>
            </v-row>
                <v-list-item color="#0000" class="profile-text-name ma-4 pt-16">
                  <v-list-item>
                    <v-list-item-title class="text-h6"> {{ user.name }} </v-list-item-title>
                    <v-list-item-subtitle>{{ user.role_id = 1 ? 'Admin':'Customer'}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{user.phone}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{user.delivery_address}}</v-list-item-subtitle>
                  </v-list-item>
                </v-list-item>
            <v-btn block color="lime" dark class="mt-4" large @click="logout()"> Log out </v-btn>
      
          </v-card>
        </v-container>


</template>
<script setup>
import {useRouter} from "vue-router";
import {useAuth} from '../services/auth'

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"))._value

function logout() {
    useAuth().logout();
    router.push('/login').then(() => {
        router.go(0); // Reloads the current route
    });
}
</script>