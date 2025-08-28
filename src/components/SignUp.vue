<template>
  <v-container fluid fill-height class="signup-background">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="10" class="pa-6 rounded-lg">
          <v-form @submit.prevent="handleRegister" ref="form">
            <div class="text-center mb-6">
              <h1 class="text-h4 font-weight-bold teal--text text--darken-2"> Join The Phone Shop </h1>
            </div>

            <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

            <v-text-field v-model="name" label="Full Name" prepend-inner-icon="mdi-account" :rules="[(v) => !!v || 'Name is required']" required outlined dense ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
              ]"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field v-model="phone" label="Phone Number" prepend-inner-icon="mdi-phone" :rules="[(v) => !!v || 'Phone is required']" required outlined dense ></v-text-field>
            <v-text-field v-model="delivery_address" label="Delivery Address" prepend-inner-icon="mdi-location" :rules="[(v) => !!v || 'Address is required']" required outlined dense ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) => v.length >= 8 || 'Password must be at least 8 characters',
              ]"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="password_confirmation"
              label="Confirm Password"
              prepend-inner-icon="mdi-lock-check"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              :rules="[
                (v) => !!v || 'Please confirm your password',
                (v) => v === password || 'Passwords must match',
              ]"
              required
              outlined
              dense
            ></v-text-field>

            <v-btn block color="lime" dark class="mt-4" large type="submit" :loading="loading" > Sign Up </v-btn>

            <div class="text-center mt-6">
              <p>
                Already have an account?
                <router-link to="/login" class="teal--text text--darken-2 font-weight-medium" >Log In</router-link >
              </p>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useAuth} from '../services/auth'

const router = useRouter();
const { register, loading, error } = useAuth()

const form = ref(null);
const name = ref("");
const email = ref("");
const phone = ref("");
const delivery_address = ref("");
const password = ref("");
const password_confirmation = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleRegister = async () => {

  loading.value = true;
  error.value = "";

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  formData.append("phone", phone.value);
  formData.append("delivery_address", delivery_address.value);
  formData.append("password_confirmation", password_confirmation.value);
  formData.append("role_id", 2);

  try {
    await register(formData)
   
    // Redirect after successful signup
    router.push('/').then(() => {
        router.go(0); // Reloads the current route
    });
  } catch (err) {
    // Error is already handled by the auth service
    console.error('Sign up failed', err)
  }
};
</script>

<style scoped>
.signup-background {
  background: linear-gradient(to right, #3adad2, #b2dfdb);
  min-height: 100vh;
}
</style>