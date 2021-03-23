<template>
  <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-2xl">
    <div class="py-6 px-8 rounded-xl">
      <h1 class="font-medium text-2xl text-center">Login</h1>
      <form @submit.prevent="login" class="mt-6">
        <div class="my-5 text-sm">
          <label for="email" class="block text-black">Email</label>
          <input
            type="text"
            v-model="form.email"
            @blur="$v.form.email.$touch"
            id="email"
            class="rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full"
            placeholder="Email"
            :class="{ 'border-1 border-red-500': $v.form.email.$error }"
          />
          <div
            v-if="!$v.form.email.required && $v.form.email.$error"
            class="text-red-500"
          >
            The email field is required
          </div>
          <div
            v-else-if="!$v.form.email.email && $v.form.email.$error"
            class="text-red-500"
          >
            The email field is invalid
          </div>
        </div>
        <div class="my-5 text-sm">
          <label for="password" class="block text-black">Password</label>
          <input
            type="password"
            v-model="form.password"
            @blur="$v.form.password.$touch"
            id="password"
            class="rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full"
            placeholder="Password"
            :class="{ 'border-1 border-red-500': $v.form.password.$error }"
          />
          <div v-if="$v.form.password.$error" class="text-red-500">
            The password field is required
          </div>
          <div
            class="flex justify-end mt-2 text-xs text-black hover:text-gray-700"
          >
            <a href="#">Forget Password?</a>
          </div>
        </div>
        <button
          class="flex items-center justify-center text-white p-3 duration-300 rounded-sm w-full"
          :class="$v.form.$error ? 'bg-gray-300 text-gray-800 cursor-default' : 'bg-gray-800 hover:bg-black'"
          :disabled="$v.form.$error"
        >
          <loading v-if="false"  class="w-4 h-4 fill-current animate-spin duration-75" />
          <span class="ml-4">Login</span>
        </button>
        <div v-if="errorMessage" class="mt-2 text-red-500">
          {{ errorMessage }}
        </div>
      </form>
      <div class="flex md:justify-between justify-center items-center mt-10">
        <div
          style="height: 1px"
          class="bg-gray-300 md:block hidden w-4/12"
        ></div>
        <p class="md:mx-2 text-sm text-center font-light text-gray-400">
          or login with
        </p>
        <div
          style="height: 1px"
          class="bg-gray-300 md:block hidden w-4/12"
        ></div>
      </div>
      <div class="flex items-center justify-between space-x-4 mt-7">
        <button
          class="flex items-center justify-center w-full text-white bg-red-500 p-3 duration-300 rounded-sm hover:bg-red-600"
          @click="signInWithGoogle"
        >
          <google class="mr-3 w-4 h-4 fill-current" />
          Google
        </button>
        <button
          class="flex items-center justify-center w-full text-white bg-blue-900 p-3 duration-300 rounded-sm hover:bg-blue-800"
        >
          <facebook class="mr-3 w-4 h-4 fill-current" />
          Facebook
        </button>
      </div>
      <div class="pt-6 text-xs text-center font-light text-gray-400">
        Don't have an account?
        <router-link
          to="/registration"
          class="text-black hover:text-gray-700 font-medium underline"
          >Create One</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import loading from '@/assets/svg/loading.svg';
import facebook from '@/assets/svg/facebook.svg';
import google from '@/assets/svg/google.svg';
import { required, email } from "vuelidate/lib/validators";
import firebase from "firebase";

export default {
  name: "LoginForm",

  components: {
    loading,
    facebook,
    google
  },

  validations: {
    form: {
      email: {
        required,
        email,
      },

      password: {
        required,
      },
    },
  },

  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      isLoading: false,
      errorMessage: null
    };
  },

  methods: {
    login() {
      this.onTouchForm();
      if (!this.$v.form.$error) {
        this.isLoading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => this.$router.replace("/dashboard"))
          .catch((error) => {
            this.isLoading = false;
            this.errorMessage = error.message;
          });
      }
    },

    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.isLoading = true;
      firebase.auth().signInWithPopup(provider)
        .then((data) => this.$router.push({name: 'Dashboard', params: { user: data.user }}))
        .catch((error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        });
    },

    onTouchForm() {
      this.$v.form.$touch();
    },
  },
};
</script>
