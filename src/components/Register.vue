<template>
<div class="w-full h-full">
  <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-2xl">
    <div class="py-8 px-8 rounded-xl">
      <h1 class="font-medium text-2xl mt-3 text-center">Register</h1>
        <form @submit.prevent="register" class="mt-6">
          <div class="my-5 text-sm">
              <label for="email" class="block text-black">Email</label>
              <input type="text" v-model="form.email" @blur="$v.form.email.$touch" autofocus id="email" class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Email"  :class="{ 'border-1 border-red-500': $v.form.email.$error }" />
              <div v-if="!$v.form.email.required && $v.form.email.$error" class="text-red-500">The email field is required</div>
              <div v-else-if="!$v.form.email.email && $v.form.email.$error" class="text-red-500">The email field is invalid</div>
          </div>
          <div class="my-5 text-sm">
              <label for="password" class="block text-black">Password</label>
              <input type="password" v-model="form.password" @blur="$v.form.password.$touch"  id="password" class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Password"
                :class="{ 'border-1 border-red-500': $v.form.password.$error }"
                />
              <div v-if="$v.form.password.$error" class="text-red-500">The password field is required</div>
              <div class="flex justify-end mt-2 text-xs text-gray-600">
                  <a href="#">Forget Password?</a>
              </div>
          </div>
          <button class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">Register</button>
        </form>
        <div class="flex md:justify-between justify-center items-center mt-10">
          <div style="height: 1px;" class="bg-gray-300 md:block hidden w-4/12"></div>
          <p class="md:mx-2 text-sm font-light text-gray-400">Login With Social </p> 
          <div style="height: 1px;" class="bg-gray-300 md:block hidden w-4/12"></div>
        </div>
        <div class="flex items-center justify-center mt-7">
          <button class="text-center w-full text-white bg-red-500 p-3 duration-300 rounded-sm hover:bg-red-600">Google</button>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';

export default {
  name: "Register",

  validations: {
    form: {
      email: {
        required,
        email
      },

      password: {
        required
      }
    }
  },

  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    register () {
      this.onTouchForm();
      if (!this.$v.form.$error) {
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password);
      }
    },

    onTouchForm () {
      this.$v.form.$touch();
    }
  }
};
</script>
